const productionConfig = {
    BACKEND_URL: "http://52.57.227.56",
    BACKEND_PORT: 4000,
    MODULES: {
        MENU: true,
    }
}

const defaultConfig = {
    BACKEND_URL: "http://52.57.227.56",
    BACKEND_PORT: 4000,
    MODULES: {
        MENU: true,
    }
}

const config = process.env.NODE_ENV === 'production' ? productionConfig : defaultConfig;

export default config;