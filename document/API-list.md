# API 설계도
## Sensor CRUD
- ### 센서 삽입 : `POST /sensors`
    - `signin`을 통해 얻은 토큰을 요청과 함께 보내야 함.
    - request
        ```JSON
            {
                "sensor_name": "sensor_name",
                "location": "location",
                "value": "value"
            }
        ```
    - response
        - 400 : 요청에 `null`이 포함되어 있을 경우
        - 401 : `Unauthorized`

<br/>

- ### 센서 조회 : `GET /sensors/:id`
    - `signin`을 통해 얻은 토큰을 요청과 함께 보내야 함.
    - response 
        - 정상 동작일 경우
            ```JSON
                {
                    "sensor_name": "sensor_name",
                    "location": "location",
                    "value": "value"
                }
            ```
        - 401 : `Unauthorized`
        - 404 : 해당 id를 가진 재고가 존재하지 않을 경우

<br/>

- ### 센서 수정 : `PATCH /inventorys/:id`
    - 아래 수정 과정은 모두 `signin`을 통해 얻은 토큰을 요청과 함께 보내야 함.
    - `sensor_name`, `location`, `value` 중 바꾸고 싶은 컬럼과 값을 넣는다.
    - request 
        ```JSON
            {
                "sensor_name": "sensor_name",
                "location": "location",
                "value": "value"
            }
        ```
    - response
        - 400 : `Bad request`
        - 401 : `Unauthorized`


<br/>

- ### 센서 삭제 : `DELETE /inventorys/:id`
    - `signin`을 통해 얻은 토큰을 요청과 함께 보내야 함.
    - response
        - 정상 동작일 경우 : 응답 없음.
        - 401 : `Unauthorized`