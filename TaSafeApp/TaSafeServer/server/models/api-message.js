var ApiMessage = function() {};
ApiMessage.prototype.EMAIL_NOT_FOUND = 0;
ApiMessage.prototype.INVALID_PWD = 1;
ApiMessage.prototype.DB_ERROR = 2;
ApiMessage.prototype.NOT_FOUND = 3;
ApiMessage.prototype.EMAIL_ALREADY_EXIST = 4;
ApiMessage.prototype.COULD_NOT_CREATE_USER = 5;
ApiMessage.prototype.PASSWORD_RESET_EXPIRED = 6;
ApiMessage.prototype.PASSWORD_RESET_HASH_MISMATCH= 7;
ApiMessage.prototype.PASSWORD_RESET_EMAIL_MISMATCH = 8;
ApiMessage.prototype.COULD_NOT_RESET_PASSWORD = 9;

module.exports = ApiMessage;

