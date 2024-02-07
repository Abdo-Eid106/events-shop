module.exports = (date) => {
   const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
   };
   return new Intl.DateTimeFormat("en-US", options).format(new Date(date));
};
