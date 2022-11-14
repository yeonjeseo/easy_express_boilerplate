/**
 * @description 첫번째 인자의 결과값에 따라 두번째 콜백을 실행할지, 세번째 콜백을 실행할지 결정하는 함수
 */
function check(predicate, onSuccess, onFail) {
  if (predicate()) onSuccess('yes');
  else onFail('no');
}

module.exports = check;
