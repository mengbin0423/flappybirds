var NetTable = /** @class */ (function () {
    function NetTable() {
        this.rows = [];
        this.cols = {};
    }
    NetTable.prototype.rowCount = function () {
        return this.rows.length;
    };
    NetTable.prototype.colCount = function () {
        var count = 0;
        for (var key in this.cols) {
            count++;
        }
        return count;
    };
    NetTable.prototype.addCol = function (name, type) {
        if (this.cols[name] != null)
            return false;
        this.cols[name] = type;
        return true;
    };
    NetTable.prototype.addRow = function () {
        var data = new Object();
        return this.rows.push(data);
    };
    NetTable.prototype.delRow = function (row) {
        if (row < 1)
            return false;
        if (this.rows.length < row)
            return false;
        this.rows.splice(row - 1, 1);
        return true;
    };
    NetTable.prototype.delRows = function () {
        this.rows.splice(0, this.rows.length);
    };
    NetTable.prototype.setLong = function (row, name, value) {
        if (row < 1)
            return false;
        if (this.rows.length < row)
            return false;
        var obj = this.rows[row - 1];
        obj[name] = value;
        return true;
    };
    NetTable.prototype.getLong = function (row, name) {
        if (row < 1)
            return -999999;
        if (this.rows.length < row)
            return -999999;
        var obj = this.rows[row - 1];
        return obj[name];
    };
    NetTable.prototype.setString = function (row, name, value) {
        if (row < 1)
            return false;
        if (this.rows.length < row)
            return false;
        var obj = this.rows[row - 1];
        obj[name] = value;
        return true;
    };
    NetTable.prototype.getString = function (row, name) {
        if (row < 1)
            return "";
        if (this.rows.length < row)
            return "";
        var obj = this.rows[row - 1];
        return obj[name];
    };
    NetTable.prototype.getTable = function (row, name) {
        if (row < 1)
            return null;
        if (this.rows.length < row)
            return null;
        var obj = this.rows[row - 1];
        return obj[name];
    };
    NetTable.prototype.setTable = function (row, name, value) {
        if (row < 1)
            return false;
        if (this.rows.length < row)
            return false;
        var obj = this.rows[row - 1];
        obj[name] = value;
        return true;
    };
    NetTable.prototype.encodec = function () {
        var buf = new Laya.Byte();
        buf.endian = Laya.Socket.BIG_ENDIAN;
        buf.writeByte(105);
        buf.writeInt32(this.colCount());
        buf.writeByte(105);
        buf.writeInt32(this.rowCount());
        for (var key in this.cols) {
            buf.writeByte(115);
            buf.writeInt16(key.length);
            buf.writeUTFBytes(key);
            buf.writeByte(0);
            buf.writeByte(105);
            buf.writeInt32(this.cols[key]);
        }
        for (var row = 1; row <= this.rowCount(); row++) {
            for (var key in this.cols) {
                if (this.cols[key] == NetTable.NET_LONG) {
                    buf.writeByte(105);
                    buf.writeInt32(this.getLong(row, key));
                }
                if (this.cols[key] == NetTable.NET_STRING) {
                    var temp = this.getString(row, key);
                    var bufstr = new Laya.Byte();
                    bufstr.writeUTFBytes(temp);
                    buf.writeByte(115);
                    buf.writeInt16(bufstr.length);
                    buf.writeUTFBytes(temp);
                    buf.writeByte(0);
                    bufstr.clear();
                }
                if (this.cols[key] == NetTable.NET_TABLE) {
                    var temp = this.getTable(row, key);
                    if (temp == null)
                        return null;
                    else {
                        buf.writeByte(116);
                        var tbuf = temp.encodec();
                        buf.writeArrayBuffer(tbuf.buffer, 0, tbuf.buffer.byteLength);
                        tbuf.clear();
                    }
                }
            }
        }
        return buf;
    };
    NetTable.prototype.decodec = function (bufs) {
        bufs.getByte();
        var colnum = bufs.getInt32();
        bufs.getByte();
        var rownum = bufs.getInt32();
        var sortCols = [];
        for (var i = 0; i < colnum; i++) {
            var type = bufs.readByte();
            if (type != 115)
                return false;
            var len = bufs.getInt16();
            var key = bufs.getUTFBytes(len);
            bufs.getByte();
            type = bufs.readByte();
            if (type != 105)
                return false;
            type = bufs.getInt32();
            this.addCol(key, type);
            sortCols.push(key);
        }
        for (var i = 1; i <= rownum; i++) {
            this.addRow();
            for (var j = 0; j < sortCols.length; j++) {
                var type = this.cols[sortCols[j]];
                if (type == NetTable.NET_LONG) {
                    if (bufs.readByte() == 105) {
                        this.setLong(i, sortCols[j], bufs.getInt32());
                    }
                    else
                        return false;
                }
                if (type == NetTable.NET_STRING) {
                    if (bufs.readByte() == 115) {
                        var len = bufs.getInt16();
                        if (len <= 0)
                            this.setString(i, sortCols[j], "");
                        else
                            this.setString(i, sortCols[j], bufs.getUTFBytes(len));
                        bufs.getByte();
                    }
                    else
                        return false;
                }
                if (type == NetTable.NET_TABLE) {
                    if (bufs.readByte() == 116) {
                        var table = new NetTable();
                        if (table.decodec(bufs) == true)
                            this.setTable(i, sortCols[j], table);
                        else
                            return false;
                    }
                    else
                        return false;
                }
            }
        }
        return true;
    };
    NetTable.prototype.addRows = function (src, row, count) {
        for (var i = row; i < row + count; i++) {
            var addrow = this.addRow();
            for (var key in this.cols) {
                if (this.cols[key] == NetTable.NET_LONG)
                    this.setLong(addrow, key, src.getLong(i, key));
                if (this.cols[key] == NetTable.NET_STRING)
                    this.setString(addrow, key, src.getString(i, key));
                if (this.cols[key] == NetTable.NET_TABLE)
                    this.setTable(addrow, key, src.getTable(i, key));
            }
        }
    };
    NetTable.prototype.clone = function () {
        var table = new NetTable();
        for (var key in this.cols) {
            table.addCol(key, this.cols[key]);
        }
        for (var row = 1; row <= this.rowCount(); row++) {
            table.addRow();
            for (var key in this.cols) {
                if (this.cols[key] == NetTable.NET_LONG)
                    table.setLong(row, key, this.getLong(row, key));
                if (this.cols[key] == NetTable.NET_STRING)
                    table.setString(row, key, this.getString(row, key));
                if (this.cols[key] == NetTable.NET_TABLE)
                    table.setTable(row, key, this.getTable(row, key));
            }
        }
        return table;
    };
    NetTable.prototype.printTable = function () {
        console.log(this.toString());
    };
    NetTable.prototype.toString = function () {
        var rntstr = "{";
        var dh = "[";
        for (var key in this.cols) {
            rntstr += dh + key;
            dh = ",";
        }
        rntstr += "]";
        for (var row = 1; row <= this.rowCount(); row++) {
            rntstr += ",";
            dh = "[";
            for (var key in this.cols) {
                if (this.cols[key] == NetTable.NET_LONG) {
                    rntstr += dh + this.getLong(row, key);
                    dh = ",";
                }
                if (this.cols[key] == NetTable.NET_STRING) {
                    rntstr += dh + "\"" + this.getString(row, key) + "\"";
                    dh = ",";
                }
                if (this.cols[key] == NetTable.NET_TABLE) {
                    rntstr += dh + this.getTable(row, key).toString();
                    dh = ",";
                }
            }
            rntstr += "]";
        }
        rntstr += "}";
        return rntstr;
    };
    //测试
    NetTable.prototype.test = function () {
        this.addCol("t1", NetTable.NET_LONG);
        this.addCol("t2", NetTable.NET_STRING);
        this.addCol("t3", NetTable.NET_TABLE);
        this.addRow();
        this.setLong(1, "t1", 99);
        this.setString(1, "t2", "test99");
        var temp = new NetTable();
        temp.addCol("t4", NetTable.NET_LONG);
        temp.addCol("t5", NetTable.NET_STRING);
        temp.addRow();
        temp.setLong(1, "t4", 77);
        temp.setString(1, "t5", "test77");
        this.setTable(1, "t3", temp);
    };
    NetTable.NET_LONG = 19;
    NetTable.NET_STRING = 22;
    NetTable.NET_TABLE = 25;
    return NetTable;
}());
//# sourceMappingURL=NetTable.js.map