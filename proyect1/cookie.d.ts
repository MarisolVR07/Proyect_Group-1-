declare module 'cookie' {
    interface CookieParseOptions {
      decode?: (value: string) => string;
    }
  
    interface CookieSerializeOptions {
      domain?: string;
      encode?: (value: string) => string;
      expires?: Date;
      httpOnly?: boolean;
      maxAge?: number;
      path?: string;
      sameSite?: true | false | 'lax' | 'strict' | 'none';
      secure?: boolean;
    }
  
    function parse(str: string, options?: CookieParseOptions): { [key: string]: string };
    function serialize(name: string, value: string, options?: CookieSerializeOptions): string;
  }
  