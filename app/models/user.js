var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  bcrypt = require('bcrypt'),
  SALT_WORK_FACTOR = 10;

var UserSchema = new Schema({
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  email: { type: String, required: true },
  nacimiento: { type: Date, required: true },
  username: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true },
  address: String,
  tel: String,
  profile: String,
  adds: Boolean,
  role: { type: String },
  publicaciones:{ type: Schema.ObjectId, ref: "Lodgin" },
  donaciones:{ type: Schema.ObjectId, ref: "Donation" },
  premium: { type: Boolean, default: false},
});

UserSchema.pre('save', function(next) {
  var user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) return next(err);

    // hash the password using our new salt
    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) return next(err);

      // override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.comparePassword = function(candidatePassword) {
  return new Promise((resolve, reject)=> {
    bcrypt.compare(candidatePassword, this.password, function (err, result) {
     if (err) {
        reject(err);
        return;
     }
     resolve(resolve);
     return;
    });

  });
};

module.exports = mongoose.model('User', UserSchema);
