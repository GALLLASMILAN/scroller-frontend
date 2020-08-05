const productionConfig = {
    BACKEND_URL: "http://3.122.245.183",
    BACKEND_PORT: 4000,
    MODULES: {
        MENU: true,
    }
}

const defaultConfig = {
    BACKEND_URL: "http://3.122.245.183",
    BACKEND_PORT: 4000,
    MODULES: {
        MENU: true,
    }
}

const config = process.env.NODE_ENV === 'production' ? productionConfig : defaultConfig;

export default config;