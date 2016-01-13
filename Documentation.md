## Classes

<dl>
<dt><a href="#API">API</a></dt>
<dd><p>Core class for danal API.</p>
</dd>
<dt><a href="#UAS">UAS</a></dt>
<dd><p>본인인증서비스 APIs</p>
</dd>
</dl>

## Members

<dl>
<dt><a href="#ENDPOINT">ENDPOINT</a> : <code>object</code></dt>
<dd><p>define endpoint</p>
</dd>
<dt><a href="#NAMES">NAMES</a> : <code>object</code></dt>
<dd><p>NAMES</p>
</dd>
</dl>

<a name="API"></a>
## API
Core class for danal API.

**Kind**: global class  

* [API](#API)
    * [new API(endpoint, opts)](#new_API_new)
    * [.getEndpoint()](#API+getEndpoint) ⇒ <code>string</code>
    * [.request(opts, cb)](#API+request)

<a name="new_API_new"></a>
### new API(endpoint, opts)
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>endpoint</td><td><code>string</code></td>
    </tr><tr>
    <td>opts</td><td><code>object</code></td>
    </tr>  </tbody>
</table>

**Example**  
```js
var api = new API('https://...', {...})
```
<a name="API+getEndpoint"></a>
### apI.getEndpoint() ⇒ <code>string</code>
return api endpiont

**Kind**: instance method of <code>[API](#API)</code>  
<a name="API+request"></a>
### apI.request(opts, cb)
request

**Kind**: instance method of <code>[API](#API)</code>  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>opts</td><td><code>object</code></td><td></td>
    </tr><tr>
    <td>opts.method</td><td><code>object</code></td><td><p><code>POST</code>, <code>GET</code> default is <code>POST</code></p>
</td>
    </tr><tr>
    <td>opts.data</td><td><code>object</code></td><td></td>
    </tr><tr>
    <td>opts.headers</td><td><code>object</code></td><td></td>
    </tr><tr>
    <td>cb</td><td><code>function</code></td><td><p>cb(err, data)</p>
</td>
    </tr>  </tbody>
</table>

<a name="UAS"></a>
## UAS
본인인증서비스 APIs

**Kind**: global class  

* [UAS](#UAS)
    * [new UAS(opts)](#new_UAS_new)
    * [.api](#UAS+api) : <code>[API](#API)</code>
    * [.request(cb)](#UAS+request)
    * [.confirm(opts, cb)](#UAS+confirm)
    * [.redirect([name], [redirect_uri])](#UAS+redirect) ⇒ <code>function</code>

<a name="new_UAS_new"></a>
### new UAS(opts)
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>opts</td><td><code>objects</code></td><td></td>
    </tr><tr>
    <td>opts.client_id</td><td><code>string</code></td><td></td>
    </tr><tr>
    <td>opts.client_secret</td><td><code>string</code></td><td></td>
    </tr><tr>
    <td>opts.redirect_uri</td><td><code>string</code></td><td></td>
    </tr><tr>
    <td>[opts.charset]</td><td><code>string</code></td><td><p>defaults: <code>UTF-8</code></p>
</td>
    </tr><tr>
    <td>[opts.agelimit]</td><td><code>string</code></td><td></td>
    </tr>  </tbody>
</table>

<a name="UAS+api"></a>
### uaS.api : <code>[API](#API)</code>
api instance

**Kind**: instance property of <code>[UAS](#UAS)</code>  
<a name="UAS+request"></a>
### uaS.request(cb)
request tid

**Kind**: instance method of <code>[UAS](#UAS)</code>  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>opts.userid</td><td><code>string</code></td>
    </tr><tr>
    <td>opts.token</td><td><code>string</code></td>
    </tr><tr>
    <td>[opts.redirect_uri]</td><td><code>string</code></td>
    </tr><tr>
    <td>cb</td><td><code>function</code></td>
    </tr>  </tbody>
</table>

<a name="UAS+confirm"></a>
### uaS.confirm(opts, cb)
final step authentication - Verify authentication information using an `tid` value

**Kind**: instance method of <code>[UAS](#UAS)</code>  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>opts</td><td><code>object</code></td><td></td>
    </tr><tr>
    <td>opts.tid</td><td><code>string</code></td><td></td>
    </tr><tr>
    <td>[opts.idenoption]</td><td><code>number</code></td><td><p>return value type - 0: <code>iden</code>, 1: <code>dateofbirth</code>, <code>gender</code></p>
</td>
    </tr><tr>
    <td>[opts.token]</td><td><code>string</code></td><td><p>token string</p>
</td>
    </tr><tr>
    <td>cb</td><td><code>function</code></td><td></td>
    </tr>  </tbody>
</table>

<a name="UAS+redirect"></a>
### uaS.redirect([name], [redirect_uri]) ⇒ <code>function</code>
return middleware for redirect

**Kind**: instance method of <code>[UAS](#UAS)</code>  
**Returns**: <code>function</code> - express middleware  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>[name]</td><td><code>string</code></td><td><p>key name of res.locals for the data transfer. (default: <code>uas</code>)</p>
</td>
    </tr><tr>
    <td>[redirect_uri]</td><td><code>string</code></td><td><p>landing url for uas</p>
</td>
    </tr>  </tbody>
</table>

<a name="ENDPOINT"></a>
## ENDPOINT : <code>object</code>
define endpoint

**Kind**: global variable  
<a name="ENDPOINT.UAS"></a>
### ENDPOINT.UAS
본인인증서비스

**Kind**: static property of <code>[ENDPOINT](#ENDPOINT)</code>  
<a name="NAMES"></a>
## NAMES : <code>object</code>
NAMES

**Kind**: global variable  

* [NAMES](#NAMES) : <code>object</code>
    * [.code](#NAMES.code) : <code>string</code>
    * [.message](#NAMES.message) : <code>string</code>
    * [.txtype](#NAMES.txtype) : <code>string</code>
    * [.client_id](#NAMES.client_id) : <code>string</code>
    * [.client_secret](#NAMES.client_secret) : <code>string</code>
    * [.service](#NAMES.service) : <code>string</code>
    * [.authtype](#NAMES.authtype) : <code>string</code>
    * [.redirect_uri](#NAMES.redirect_uri) : <code>string</code>
    * [.userid](#NAMES.userid) : <code>string</code>
    * [.token](#NAMES.token) : <code>string</code>
    * [.charset](#NAMES.charset) : <code>string</code>
    * [.agelimit](#NAMES.agelimit) : <code>string</code>
    * [.cancel_uri](#NAMES.cancel_uri) : <code>string</code>
    * [.use_ci](#NAMES.use_ci) : <code>string</code>
    * [.ci_url](#NAMES.ci_url) : <code>string</code>
    * [.bg_color](#NAMES.bg_color) : <code>string</code>
    * [.carrier](#NAMES.carrier) : <code>string</code>
    * [.phonenum](#NAMES.phonenum) : <code>string</code>
    * [.yearofbirth](#NAMES.yearofbirth) : <code>string</code>
    * [.passvalue](#NAMES.passvalue) : <code>string</code>
    * [.tid](#NAMES.tid) : <code>string</code>
    * [.confirmoption](#NAMES.confirmoption) : <code>string</code>
    * [.idenoption](#NAMES.idenoption) : <code>string</code>
    * [.name](#NAMES.name) : <code>string</code>
    * [.ci](#NAMES.ci) : <code>string</code>
    * [.di](#NAMES.di) : <code>string</code>
    * [.iden](#NAMES.iden) : <code>string</code>
    * [.dateofbirth](#NAMES.dateofbirth) : <code>string</code>
    * [.gender](#NAMES.gender) : <code>string</code>

<a name="NAMES.code"></a>
### NAMES.code : <code>string</code>
`RETURNCODE` 결과 코드

**Kind**: static property of <code>[NAMES](#NAMES)</code>  
<a name="NAMES.message"></a>
### NAMES.message : <code>string</code>
`RETURNMSG` 결과 메시지`

**Kind**: static property of <code>[NAMES](#NAMES)</code>  
<a name="NAMES.txtype"></a>
### NAMES.txtype : <code>string</code>
`TXTYPE`

**Kind**: static property of <code>[NAMES](#NAMES)</code>  
<a name="NAMES.client_id"></a>
### NAMES.client_id : <code>string</code>
`CPID` 가맹점 ID

**Kind**: static property of <code>[NAMES](#NAMES)</code>  
<a name="NAMES.client_secret"></a>
### NAMES.client_secret : <code>string</code>
`CPPWD` 가맹점 PWD

**Kind**: static property of <code>[NAMES](#NAMES)</code>  
<a name="NAMES.service"></a>
### NAMES.service : <code>string</code>
`SERVICE` 서비스 구분

**Kind**: static property of <code>[NAMES](#NAMES)</code>  
<a name="NAMES.authtype"></a>
### NAMES.authtype : <code>string</code>
`AUTHTYPE` 인증 TYPE

**Kind**: static property of <code>[NAMES](#NAMES)</code>  
<a name="NAMES.redirect_uri"></a>
### NAMES.redirect_uri : <code>string</code>
`TARGETURL` 가맹점 인증 완료 페이지 URL

**Kind**: static property of <code>[NAMES](#NAMES)</code>  
<a name="NAMES.userid"></a>
### NAMES.userid : <code>string</code>
`USERID` 사용자 ID

**Kind**: static property of <code>[NAMES](#NAMES)</code>  
<a name="NAMES.token"></a>
### NAMES.token : <code>string</code>
`ORDERID` 가맹점 주문번호

**Kind**: static property of <code>[NAMES](#NAMES)</code>  
<a name="NAMES.charset"></a>
### NAMES.charset : <code>string</code>
`CHARSET`: UTF-8 (default), EUC-KR

**Kind**: static property of <code>[NAMES](#NAMES)</code>  
<a name="NAMES.agelimit"></a>
### NAMES.agelimit : <code>string</code>
`AGELIMIT` 서비스 사용 제한 나이 설정`

**Kind**: static property of <code>[NAMES](#NAMES)</code>  
<a name="NAMES.cancel_uri"></a>
### NAMES.cancel_uri : <code>string</code>
`BackURL` 에러 발생 및 취소시 이동할 페이지 URL

**Kind**: static property of <code>[NAMES](#NAMES)</code>  
<a name="NAMES.use_ci"></a>
### NAMES.use_ci : <code>string</code>
`IsUseCI` 가맹점 C.I 사용 여부 (Y/N)

**Kind**: static property of <code>[NAMES](#NAMES)</code>  
<a name="NAMES.ci_url"></a>
### NAMES.ci_url : <code>string</code>
`CIURL` 가맹점 C.I 이미지 URL - basic: 115x47, mobile: 77x29

**Kind**: static property of <code>[NAMES](#NAMES)</code>  
<a name="NAMES.bg_color"></a>
### NAMES.bg_color : <code>string</code>
`BgColor` 화면 color 설정시 사용

**Kind**: static property of <code>[NAMES](#NAMES)</code>  
<a name="NAMES.carrier"></a>
### NAMES.carrier : <code>string</code>
`IsCarrier` 통신사 정보 (`SKT`, `KTF`, `LGT`, `MVNO`). 인증화면에 통신사 고정

**Kind**: static property of <code>[NAMES](#NAMES)</code>  
<a name="NAMES.phonenum"></a>
### NAMES.phonenum : <code>string</code>
`IsDstAddr` 고객전화번호 (`-`로 구분됨, 010-1111-1111). 인증화면에 전화번호 고정

**Kind**: static property of <code>[NAMES](#NAMES)</code>  
<a name="NAMES.yearofbirth"></a>
### NAMES.yearofbirth : <code>string</code>
`YearOfBirth` 고객 생년 (1982). 인증화면에 년도 정보 고정

**Kind**: static property of <code>[NAMES](#NAMES)</code>  
<a name="NAMES.passvalue"></a>
### NAMES.passvalue : <code>string</code>
`ByPassValue` 추가 전달이 필요한 값

**Kind**: static property of <code>[NAMES](#NAMES)</code>  
<a name="NAMES.tid"></a>
### NAMES.tid : <code>string</code>
`TID` 거래 번호

**Kind**: static property of <code>[NAMES](#NAMES)</code>  
<a name="NAMES.confirmoption"></a>
### NAMES.confirmoption : <code>string</code>
`CONFIRMOPTION` `CPID`, `ORDERID` 확인 여부 (0: 미확인, default, 1: 확인)

**Kind**: static property of <code>[NAMES](#NAMES)</code>  
<a name="NAMES.idenoption"></a>
### NAMES.idenoption : <code>string</code>
`IDENOPTION` 결과 타입 설정 (0: `iden` 반환, 1: `dateofbirth`, `gender` 필드 리턴)

**Kind**: static property of <code>[NAMES](#NAMES)</code>  
<a name="NAMES.name"></a>
### NAMES.name : <code>string</code>
`NAME` 사용자 이름

**Kind**: static property of <code>[NAMES](#NAMES)</code>  
<a name="NAMES.ci"></a>
### NAMES.ci : <code>string</code>
`CI` 인증 고유키

**Kind**: static property of <code>[NAMES](#NAMES)</code>  
<a name="NAMES.di"></a>
### NAMES.di : <code>string</code>
`DI` SITE 연계 정보

**Kind**: static property of <code>[NAMES](#NAMES)</code>  
<a name="NAMES.iden"></a>
### NAMES.iden : <code>string</code>
`IDEN` 사용자 생년월일, 성별 (ex: 1401011), `idenoption`이 0일 경우

**Kind**: static property of <code>[NAMES](#NAMES)</code>  
<a name="NAMES.dateofbirth"></a>
### NAMES.dateofbirth : <code>string</code>
`DOB` 사용자 생년월일 (ex: 20140101), `idenoption`이 1일 경우

**Kind**: static property of <code>[NAMES](#NAMES)</code>  
<a name="NAMES.gender"></a>
### NAMES.gender : <code>string</code>
`SEX` 사용자 성별 (ex: 1), `idenoption`이 1인 경우

**Kind**: static property of <code>[NAMES](#NAMES)</code>  
