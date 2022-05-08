import { Typography } from "@mui/material";
import React from "react";

const JWTToken = () => {
  return (
    <>
      <Typography variant="h6" mb={3}>
        2. The purposes and working method of JWT
      </Typography>

      <Typography paragraph>
        Json Web Token(JWT) is primarily used for securely transmitting data
        between parties as a json object maintaining open source standard(RFC
        7519). It creates secret key using HMAC algorithm or public/private key
        pair using RSA or ECDSA, which are digitally signed. So it is a verified
        and trusted way of transmitting information. In general authentication
        and authorization process can be more efficient and secure using JWT.
      </Typography>

      <Typography paragraph>
        In authentication, when the user successfully logs in using their
        credentials, a JSON Web Token will be returned. Whenever the user wants
        to access a protected route or resource, the user agent should send the
        JWT, typically in the Authorization header using the Bearer schema.
      </Typography>

      <Typography paragraph>
        This can be, in certain cases, a stateless authorization mechanism. The
        server's protected routes will check for a valid JWT in the
        Authorization header, and if it's present, the user will be allowed to
        access protected resources. If the JWT contains the necessary data, the
        need to query the database for certain operations may be reduced, though
        this may not always be the case.
      </Typography>
    </>
  );
};

export default JWTToken;
