var response ={
    status: 'connected',
    authResponse: {
        accessToken: '...',
        expiresIn:'...',
        signedRequest:'...',
        userID:'...'
    }
}
FB.getLoginStatus(function(response) {
    if (response.status === 'connected') {
      // Người dùng đã đăng nhập
      console.log('Người dùng đã đăng nhập bằng Facebook');
      // Lấy thông tin người dùng
      FB.api('/me', { fields: 'name,email,picture' }, function(user) {
        if (user) {
          console.log('Tên người dùng:', user.name);
          console.log('Email:', user.email);
          console.log('Ảnh đại diện:', user.picture.data.url);
        }
      });
    } else {
      // Người dùng chưa đăng nhập
      console.log('Người dùng chưa đăng nhập bằng Facebook');
    }
  });
function checkLoginState() {
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
  }