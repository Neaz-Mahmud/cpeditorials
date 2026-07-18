const logger = {
  /**
   *normal info like (server started,database connected,etc.)
   * @param  {...any} args
   */
  info: (...args) => {
    console.log(` [${new Date().toString()}]   INFO:`, ...args);
  },

  warn: (...args) => {
    console.warn(` [${new Date().toString()}]   WARN:`, ...args);
  },

  error: (...args) => {
    console.error(` [${new Date().toString()}]   ERROR:`, ...args);
  },
};

export default logger;
