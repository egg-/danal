/**
 * @file names.js
 */

/**
 * NAMES
 * @type {object}
 */
var NAMES = {
  /**
   * `RETURNCODE` 결과 코드
   * @type {string}
   */
  code: 'RETURNCODE',
  /**
   * `RETURNMSG` 결과 메시지`
   * @type {string}
   */
  message: 'RETURNMSG',
  /**
   * `TXTYPE`
   * @type {string}
   */
  txtype: 'TXTYPE',
  /**
   * `CPID` 가맹점 ID
   * @type {string}
   */
  client_id: 'CPID',
  /**
   * `CPPWD` 가맹점 PWD
   * @type {string}
   */
  client_secret: 'CPPWD',
  /**
   * `SERVICE` 서비스 구분
   * @type {string}
   */
  service: 'SERVICE',
  /**
   * `AUTHTYPE` 인증 TYPE
   * @type {string}
   */
  authtype: 'AUTHTYPE',
  /**
   * `TARGETURL` 가맹점 인증 완료 페이지 URL
   * @type {string}
   */
  redirect_uri: 'TARGETURL',
  /**
   * `USERID` 사용자 ID
   * @type {string}
   */
  userid: 'USERID',
  /**
   * `ORDERID` 가맹점 주문번호
   * @type {string}
   */
  token: 'ORDERID',
  /**
   * `CHARSET`: UTF-8 (default), EUC-KR
   * @type {string}
   */
  charset: 'CHARSET',
  /**
   * `AGELIMIT` 서비스 사용 제한 나이 설정`
   * @type {string}
   */
  agelimit: 'AGELIMIT',
  /**
   * `BackURL` 에러 발생 및 취소시 이동할 페이지 URL
   * @type {string}
   */
  cancel_uri: 'BackURL',
  /**
   * `IsUseCI` 가맹점 C.I 사용 여부 (Y/N)
   * @type {string}
   */
  use_ci: 'IsUseCI',
  /**
   * `CIURL` 가맹점 C.I 이미지 URL - basic: 115x47, mobile: 77x29
   * @type {string}
   */
  ci_url: 'CIURL',
  /**
   * `BgColor` 화면 color 설정시 사용
   * @type {string}
   */
  bg_color: 'BgColor',
  /**
   * `IsCarrier` 통신사 정보 (`SKT`, `KTF`, `LGT`, `MVNO`). 인증화면에 통신사 고정
   * @type {string}
   */
  carrier: 'IsCarrier',
  /**
   * `IsDstAddr` 고객전화번호 (`-`로 구분됨, 010-1111-1111). 인증화면에 전화번호 고정
   * @type {string}
   */
  phonenum: 'IsDstAddr',
  /**
   * `YearOfBirth` 고객 생년 (1982). 인증화면에 년도 정보 고정
   * @type {string}
   */
  yearofbirth: 'YearOfBirth',
  /**
   * `ByPassValue` 추가 전달이 필요한 값
   * @type {string}
   */
  passvalue: 'ByPassValue',
  /**
   * `TID` 거래 번호
   * @type {string}
   */
  tid: 'TID',
  /**
   * `CONFIRMOPTION` `CPID`, `ORDERID` 확인 여부 (0: 미확인, default, 1: 확인)
   * @type {string}
   */
  confirmoption: 'CONFIRMOPTION',
  /**
   * `IDENOPTION` 결과 타입 설정 (0: `iden` 반환, 1: `dateofbirth`, `gender` 필드 리턴)
   * @type {string}
   */
  idenoption: 'IDENOPTION',
  /**
   * `NAME` 사용자 이름
   * @type {string}
   */
  name: 'NAME',
  /**
   * `CI` 인증 고유키
   * @type {string}
   */
  ci: 'CI',
  /**
   * `DI` SITE 연계 정보
   * @type {string}
   */
  di: 'DI',
  /**
   * `IDEN` 사용자 생년월일, 성별 (ex: 1401011), `idenoption`이 0일 경우
   * @type {string}
   */
  iden: 'IDEN',
  /**
   * `DOB` 사용자 생년월일 (ex: 20140101), `idenoption`이 1일 경우
   * @type {string}
   */
  dateofbirth: 'DOB',
  /**
   * `SEX` 사용자 성별 (ex: 1), `idenoption`이 1인 경우
   * @type {string}
   */
  gender: 'SEX'
}

module.exports = NAMES
