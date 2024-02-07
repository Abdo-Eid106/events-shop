const { validationResult } = require("express-validator");

exports.updateMe = async (req, res, next) => {
   const errors = validationResult(req);

   if (!errors.isEmpty()) {
      let errs = {};
      for (const error of errors.array()) errs[error.path] = error.msg;

      req.body.email = req.user.email;
      return res.render("profile", {
         user: req.user,
         data: req.body,
         errors: errs,
      });
   }

   const { firstName, lastName, address } = req.body;
   const fields = { firstName, lastName, address };
   if (req.body.newPassword) fields.password = req.body.newPassword;

   req.user = await req.user.update(fields);
   res.redirect("/profile");
};
