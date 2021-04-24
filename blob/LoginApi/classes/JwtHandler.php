<?php 
require __DIR__.'/../jwt/JWT.php';
require __DIR__.'/../jwt/ExpiredException.php';
require __DIR__.'/../jwt/SignatureInvalidException.php';
require __DIR__.'/../jwt/BeforeValidException.php';

use \Firebase\JWT\JWT;

class JwtHandler {
    protected $jwt_secrect;
    protected $token;
    protected $issuedAt;
    protected $expire;
    protected $jwt;

    public function __construct() {
        date_default_timezone_set('Europe/Amsterdam');
        $this->issuedAt = time();
        
        // Token Validity (In seconds)
        $this->expire = $this->issuedAt + 3600;
        $this->jwt_secrect = "mySecretToken";  
    }

    public function __jwt_encode_data($iss, $data) {
        $this->token = [
            // Token Identifier 
            "iss" => $iss, "aud" => $iss,
            // Token Issue & Expiration date.
            "iat" => $this->issuedAt, "exp" => $this->expire,
            // Payload
            "data"=> $data
        ];

        $this->jwt = JWT::encode($this->token, $this->jwt_secrect);
        return $this->jwt;
    }

    protected function __errMsg($msg) {
        return [
            "auth" => 0, "message" => $msg
        ];
    }

    public function __showProperties() {
        var_dump($this->jwt);
    }
    
    public function __jwt_decode_data($jwt_token) {
        try{
            $decode = JWT::decode($jwt_token, $this->jwt_secrect, array('HS256'));
            return [
                "auth" => 1, "data" => $decode->data
            ];
        }
        catch(\Firebase\JWT\ExpiredException $e){ return $this->__errMsg($e->getMessage());}
        catch(\Firebase\JWT\SignatureInvalidException $e){ return $this->__errMsg($e->getMessage());}
        catch(\Firebase\JWT\BeforeValidException $e){ return $this->__errMsg($e->getMessage());}
        catch(\DomainException $e){ return $this->__errMsg($e->getMessage());}
        catch(\InvalidArgumentException $e){ return $this->__errMsg($e->getMessage());}
        catch(\UnexpectedValueException $e){ return $this->__errMsg($e->getMessage());}
    }
}