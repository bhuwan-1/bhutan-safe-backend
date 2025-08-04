export function sendTokenToCookie(res, accessToken) {
    res.cookie('accessToken', accessToken, { 
        maxAge: 1000 * 60 * 60, 
        httpOnly: true,
        secure: false
    });
    //httpOnly: only set by HTTP
    //secure: false means it can be accessed in both http and https.
}