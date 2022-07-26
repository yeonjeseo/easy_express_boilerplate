export const readAllUsers = async (req, res) => {
  try {
    console.log('회원 전체 조회');
    return res.status(200).json('ok');
  } catch (e) {
    console.log(e);
    return res.status(400).json('not ok');
  }
};

export const createUser = async (req, res) => {
  try {
    console.log('asdasd');
    return res.status(200).json('ok');
  } catch (e) {
    console.log(e);
    return res.status(400).json('not ok');
  }
};
