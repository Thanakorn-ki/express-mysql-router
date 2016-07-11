module.exports = function(res, data, errorcode, message) {
  if (errorcode === undefined) {
    res.json({
        statusCode: 200,
        data: data,
        message: 'success'
      }
    )
  }else {
    res.json({
      statusCode: errorcode,
      message: message
    })
  }
}
