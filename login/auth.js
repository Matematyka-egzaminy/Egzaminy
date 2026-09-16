(function (global) {
    const USER_KEY = 'authUser';

    function scriptBaseUrl() {
        const current = document.currentScript;
        if (current && current.src) {
            return new URL('.', current.src);
        }

        return new URL('login/', window.location.href);
    }

    const baseUrl = scriptBaseUrl();

    function loginUrl() {
        return new URL('login.html', baseUrl).href;
    }

    function homeUrl() {
        return new URL('../index.html', baseUrl).href;
    }

    function isLoginPage() {
        const path = window.location.pathname.replace(/\\/g, '/').toLowerCase();
        return path.endsWith('/login/login.html') || path.endsWith('/login.html');
    }

    function getUser() {
        return sessionStorage.getItem(USER_KEY);
    }

    function setUser(username) {
        sessionStorage.setItem(USER_KEY, username);
    }

    function clearUser() {
        sessionStorage.removeItem(USER_KEY);
    }

    function protectPage() {
        const loggedIn = Boolean(getUser());

        if (isLoginPage()) {
            if (loggedIn) {
                window.location.replace(homeUrl());
            }
            return;
        }

        if (!loggedIn) {
            window.location.replace(loginUrl());
        }
    }

    function logout() {
        clearUser();
        window.location.href = loginUrl();
    }

    global.Auth = {
        getUser: getUser,
        setUser: setUser,
        clearUser: clearUser,
        logout: logout,
        protectPage: protectPage,
        loginUrl: loginUrl,
        homeUrl: homeUrl
    };
    global.logout = logout;

    protectPage();
})(window);
