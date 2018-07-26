const crypto = require('./crypto-js');

function encodeUTF8(s) {
    var i, r = [], c, x;
    for (i = 0; i < s.length; i++)
      if ((c = s.charCodeAt(i)) < 0x80) r.push(c);
      else if (c < 0x800) r.push(0xC0 + (c >> 6 & 0x1F), 0x80 + (c & 0x3F));
      else {
        if ((x = c ^ 0xD800) >> 10 == 0)
          c = (x << 10) + (s.charCodeAt(++i) ^ 0xDC00) + 0x10000,
            r.push(0xF0 + (c >> 18 & 0x7), 0x80 + (c >> 12 & 0x3F));
        else r.push(0xE0 + (c >> 12 & 0xF));
        r.push(0x80 + (c >> 6 & 0x3F), 0x80 + (c & 0x3F));
      };
    return r;
};

function Sha1Hash(password,salt){
    var hash = [salt,password];
    if(hash[0]!=null && hash[1]!=null){
        if(hash[1]!="")
            return crypto.SHA1(hash.join(''));
    }
    return "encrypto error";
}

function UserEncryptHash(token){
    var token = token.toString();
    var hash = new Array(token.length);
    var now = new Date();
    const timestamp = now.getFullYear().toString()+now.getMonth()+now.getDate()+now.getHours()+now.getMinutes();
    console.log("时间戳:"+timestamp);
    const confusion = "codedog_studio";
    var sha1Hash = Sha1Hash(confusion,timestamp).toString();
    console.log("散列码:"+sha1Hash);

    if (token.length===sha1Hash.length){
        for(var i = 0;i < token.length;i++){
            hash[i] = String.fromCharCode((token[i]).charCodeAt() ^ (sha1Hash[i]).charCodeAt());
        }
    }

    // for(var i = 0;i < token.length;i++){
    //     for( var j = 0 ;j < sha1Hash.length;j++){
    //         hash[i] = (token[i] ^ sha1Hash[j]);
    //         console.log(hash[i]+" - "+token[i]+" - "+sha1Hash[j]);
    //     }
    // }
    
    
    return hash.join('');
}

module.exports={
    encodeUTF8:encodeUTF8,
    Sha1Hash:Sha1Hash,
    UserEncryptHash:UserEncryptHash
}
