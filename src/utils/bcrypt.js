import bcrypt from 'bcrypt';
import config from '../config/general.config.js';

const SALT_ROUND = Number(config.SALT_ROUND);
const NAVER_APP_ID = config.NAVER_APP_ID;
const NAVER_APP_SECRET = config.NAVER_APP_SECRET;

export const plainToHash = (plain, salt = SALT_ROUND) => bcrypt.hash(plain, salt);

export const comparePlainHash = (plain, hashed) => bcrypt.compare(plain, hashed);

/**
 * 전자서명은 bcrypt 해싱을 사용하여 생성합니다. 생성에 사용되는 bcrypt 해싱 함수 실행에는 2개의 파라미터가 필요합니다.
 *
 * BCrypt.hashpw(password, salt)
 * password: 제공된 client_id와 timestamp 값을 밑줄(_)로 연결합니다.
 * 예: client_id가 'aaaabbbb', timestamp가 '1643956077762'인 경우 aaaabbbb_1643956077762
 * salt: 제공된 client_secret을 사용합니다.
 */

export const createNaverSignature = async (timestamp) => {
	const plain = `${NAVER_APP_ID}_${timestamp}`
	const hashed = await plainToHash(plain, NAVER_APP_SECRET);
	return Buffer.from(hashed, "utf-8").toString("base64")
}