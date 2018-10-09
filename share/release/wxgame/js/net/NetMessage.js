var NetMessage = /** @class */ (function () {
    function NetMessage() {
        this.bufs = null;
        this.cmd = 0;
        this.bufs = new Laya.Byte();
        this.bufs.endian = Laya.Socket.BIG_ENDIAN;
        this.bufs.writeInt32(0);
        this.bufs.writeInt32(0);
        this.bufs.writeInt32(0);
    }
    NetMessage.prototype.addCmd = function (value) {
        var save = this.bufs.pos;
        this.bufs.pos = 0;
        this.bufs.writeInt32(value);
        this.bufs.pos = save;
        this.cmd = value;
    };
    NetMessage.prototype.setSession = function (session) {
        var save = this.bufs.pos;
        this.bufs.pos = 4;
        this.bufs.writeInt32(session);
        this.bufs.pos = save;
    };
    NetMessage.prototype.setTick = function (tick) {
        var save = this.bufs.pos;
        this.bufs.pos = 8;
        this.bufs.writeInt32(tick);
        this.bufs.pos = save;
    };
    NetMessage.prototype.getCmd = function () {
        return this.cmd;
    };
    NetMessage.prototype.addLong = function (value) {
        this.bufs.writeByte(105);
        this.bufs.writeInt32(value);
    };
    NetMessage.prototype.getLong = function () {
        var type = this.bufs.getByte();
        if (type == 105)
            return this.bufs.getInt32();
        else
            return -99999;
    };
    NetMessage.prototype.addString = function (value) {
        this.bufs.writeByte(115);
        this.bufs.writeUTFString(value);
        this.bufs.writeByte(0);
    };
    NetMessage.prototype.getString = function () {
        var type = this.bufs.getByte();
        if (type == 115) {
            var len = this.bufs.getInt16();
            var ret = this.bufs.getUTFBytes(len);
            this.bufs.getByte();
            return ret;
        }
        else
            return "";
    };
    NetMessage.prototype.getTable = function () {
        try {
            var type = this.bufs.getByte();
            if (type == 116) {
                var table = new NetTable();
                table.decodec(this.bufs);
                return table;
            }
            else
                return null;
        }
        catch (e) {
            return null;
        }
    };
    NetMessage.prototype.addTable = function (value) {
        this.bufs.writeByte(116);
        var temp = value.encodec();
        this.bufs.writeArrayBuffer(temp.buffer, 0, temp.buffer.byteLength);
    };
    NetMessage.prototype.encodec = function (session) {
        if (this.bufs != null)
            return this.bufs;
        this.setSession(session);
        var date = new Date();
        this.setTick(Math.floor(date.getTime() / 1000));
        return this.bufs;
    };
    NetMessage.prototype.decodec = function (bufs) {
        bufs.pos = 0;
        this.addCmd(bufs.getInt32());
        this.setSession(bufs.getInt32());
        this.setTick(bufs.getInt32());
        while (bufs.bytesAvailable > 0) {
            var type = bufs.readByte();
            if (type == 105) {
                this.addLong(bufs.getInt32());
            }
            if (type == 115) {
                var len = bufs.getInt16();
                if (len > 0)
                    this.addString(bufs.getUTFBytes(len));
                else
                    this.addString("");
            }
            if (type == 116) {
                var table = new NetTable();
                table.decodec(bufs);
                this.addTable(table);
            }
        }
        bufs.clear();
        this.bufs.pos = 12;
        return true;
    };
    NetMessage.prototype.clear = function () {
        if (this.bufs != null)
            this.bufs.clear();
    };
    NetMessage.prototype.test = function () {
        var date = new Date();
        console.log(date.getTime());
        this.addCmd(1);
        this.addLong(1);
        this.addString("2");
        var table = new NetTable();
        table.addCol("c1", NetTable.NET_LONG);
        table.addCol("c2", NetTable.NET_STRING);
        table.addRow();
        table.setLong(1, "c1", 1);
        table.setString(1, "c2", "2");
        this.addTable(table);
        var message = new NetMessage();
        message.decodec(this.encodec(1));
        console.log(message.getCmd());
        console.log(message.getLong());
        console.log(message.getString());
        table = message.getTable();
        console.log(table.getLong(1, "c1"));
        console.log(table.getString(1, "c2"));
    };
    return NetMessage;
}());
//# sourceMappingURL=NetMessage.js.map