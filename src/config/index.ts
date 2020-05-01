const productionConfig = {
    BACKEND_URL: "http://3.121.209.17",
    BACKEND_PORT: 4000,
    MODULES: {
        MENU: true,
    }
}

const defaultConfig = {
    BACKEND_URL: "http://3.121.209.17",
    BACKEND_PORT: 4000,
    MODULES: {
        MENU: true,
    }
}

const config = process.env.NODE_ENV === 'production' ? productionConfig : defaultConfig;

export default config;