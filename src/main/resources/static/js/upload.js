/*
    [비동기 파일업로드 서버]
    - 파일 업로드를 우히ㅏㄴ 비동기 통신을 처리하는 자바스크립트 파일
    - async : 비동기 함수로 만드는 키워드
    - awiat : 비동기 함수 안에서만 사용할 수 있으며, Promise 가 처리될 때까지 함수으 실해을 이시 중단합니다.
            그리고 Promise가 처리되면 그 결과 값을 반환.
    - Promise : 비동기 처리를 위한 자바스크립트 객체로서, 비동기 작업이 완료되었을 때 또는
            실패했을 때의 결과 값을 알려줌. 프로미스는 약속이라는 뜻으로 비동기 처리의 결과를 약속하는 객체.
    - axios : HTTP 클라이언트 라이브러리로써, 비동기 방식으로 서버와 데이터를 주고받을 수 있음.(ajax와 유사)
    - axios의 반환 결과는 Promise 객체로 반환되며, 이 Promise는 함수가 반환한 값 또는 예외를 포함.
*/
async function uploadToServer (formObj) {
    // CSRF 토큰을 가져옴
    const csrfToken = document.querySelector('meta[name="_csrf"]').getAttribute('content');
    const csrfHeader = document.querySelector('meta[name="_csrf_header"]').getAttribute('content');

    console.log("upload to server......")
    const response = await axios({
        method: 'post',
        url: '/upload',
        data: formObj,
        headers: {
            'Content-Type': 'multipart/form-data',  // 파일 업로드를 위한 헤더 설정
            [csrfHeader] : csrfToken // CSRF 토큰을 헤더에 포함
        },
    });

    /*
    const response = await axios.post('/upload',
        formObj,
        { // 객체 리터럴(key-value)
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }
    );
    */

    console.log('여기는 upload.js', response.data)

    return response.data;   // Promise 객체 반환, 이행상태, 여기서 반환값을 꺼낼 때는 .data를 사용
}

async function removeFileToServer(uuid, fileName){

    const response = await axios.delete(`/remove/${uuid}_${fileName}`)

    return response.data

}
