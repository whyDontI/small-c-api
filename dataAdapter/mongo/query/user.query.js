const user = require('../models/user.model')

class User {
  /**
    *__getUserById() Get user by Id
    *@param {string} id - User _id
    *@return {Promise<mongoose.Query>}
    * */
  async __getUserById (id) {
    return user.findOne({
      _id: id
    })
      .lean()
  }

  /**
    *__getUserByEmail() Get user by Email
    *@param {string} email - user email
    *@return {Promise}
    * */
  async __getUserByEmail (email) {
    return user.findOne({
      email: email
    })
      .lean()
  }

  /**
    *__getUserByNumber() Get user by Number
    *@param {string} number - user Number
    *@return {Promise}
    * */
  async __getUserByNumber (number) {
    return user.findOne({
      phoneNumber: number
    })
      .lean()
  }

  /**
    *__getUserCount() Get user Count
    *@param {string} phoneNumber - User phoneNumber
    *@return {Promise<mongoose.Query>}
    * */
  async __getUserCount (phoneNumber) {
    return user.find({
      phoneNumber: phoneNumber
    })
      .countDocuments()
  }

  /**
    *__getUsers() Get users
    *@param {Object} req.query - Express req.query
    *@param {string} query.search - Search string
    *@param {number} query.sort - [sort = -1] One for ascending / negative one for descending
    *@param {number} query.size - [size = 100] Documents per page
    *@param {number} query.page - [page = 0] Page number
    *@return {Promise<mongoose.Query>}
    * */
  async __getUsers ({
    search,
    sort = -1,
    size = 100,
    page = 0
  }) {
    const obj = (search) ? {
      name: {
        $regex: '.*' + search + '.*',
        $options: 'i'
      }
    } : {}

    return user.find(obj)
      .sort({
        _id: (sort)
      })
      .select('-password -__v')
      .limit(parseInt(size))
      .skip(parseInt(size) * parseInt(page))
      .lean()
  }

  /**
    *__insertUserDetails() Create New user with provided details
    *@param {object} userdata - User Data object
    *@param {string} userdata.name - User name
    *@param {string} userdata.email - User email
    *@param {string} userdata.phoneNumber - User phoneNumber
    *@param {string} userdata.password - User password
    *@return {Promise<mongoose.Query>}
    * */
  async __insertUserDetails (userData) {
    return user.create(userData)
  }

  /**
    *__updateUserDetails() Update user
    *@param {string} id - User _id
    *@param {object} data - Data to be updated
    *@return {Promise<mongoose.Query>}
    * */
  async __updateUserDetails (id, data) {
    return user.updateOne({
      _id: id
    }, {
      $set: data
    })
  }

  async __deleteUser (id) {
    return user.remove({
      _id: id
    })
  }
};

module.exports = new User()
