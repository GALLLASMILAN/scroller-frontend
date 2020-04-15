const productionConfig = {
    BACKEND_URL: "http://18.196.28.63",
    BACKEND_PORT: 4000
}

const defaultConfig = {
    BACKEND_URL: "http://18.196.28.63",
    BACKEND_PORT: 4000
}

const config = process.env.NODE_ENV === 'production' ? productionConfig : defaultConfig;

export default config;