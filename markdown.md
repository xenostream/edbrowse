# Markdown 문법
# 0. 목차
* 괄호 안에 ```#이동할 헤드(제목)``` 를 써주면 웹페이지에서 아래와 같이 해당 제목이 있는 곳으로 이동
* 띄어쓰기는 ```-``` 로 연결
```python
**목차**  
[1. 헤더 (Headers)](#1.-헤더-(Headers))  
[2. 줄바꿈 (Line Breaks)](#2.-줄바꿈-(Line-Breaks))  
[3. 목록 (List)](#3.-목록-(List))  
[4. 인용문 (BlockQuote)](#4.-인용문-(BlockQuote))  
[5. 코드(Code)블럭](#5.-코드(Code)블럭)  
[6. 수평선 (Horizontal Rule)](#6.-수평선-(Horizontal-Rule))  
[7. 강조 (Emphasis)](#7.-강조-(Emphasis))  
[8. 링크 (Links)](#8.-링크-(Links))  
[9. 이미지 (Image)](#9.-이미지-(Image))  
[10. 표 (Table)](#10.-표-(Table))  
[11. 각주 (Footnote)](#11.-각주-(Footnote))  
[12. 접기 (Fold)](#12.-접기-(Fold))  
[13. 이스케이프 (Backslash Escapes)](#13.-이스케이프-(Backslash-Escapes))  
```
**목차**  
[1. 헤더 (Headers)](#1.-헤더-(Headers))  
[2. 줄바꿈 (Line Breaks)](#2.-줄바꿈-(Line-Breaks))  
[3. 목록 (List)](#3.-목록-(List))  
[4. 인용문 (BlockQuote)](#4.-인용문-(BlockQuote))  
[5. 코드(Code)블럭](#5.-코드(Code)블럭)  
[6. 수평선 (Horizontal Rule)](#6.-수평선-(Horizontal-Rule))  
[7. 강조 (Emphasis)](#7.-강조-(Emphasis))  
[8. 링크 (Links)](#8.-링크-(Links))  
[9. 이미지 (Image)](#9.-이미지-(Image))  
[10. 표 (Table)](#10.-표-(Table))  
[11. 각주 (Footnote)](#11.-각주-(Footnote))  
[12. 접기 (Fold)](#12.-접기-(Fold))  
[13. 이스케이프 (Backslash Escapes)](#13.-이스케이프-(Backslash-Escapes))  

---
## 1. 헤더 (Headers)
* 6가지의 제목을 나타내는 문법이 있는데 ```#```을 사용 (글머리는 1 ~ 6까지만 지원)
```python
# 제목 1
## 제목 2
### 제목 3
#### 제목 4
##### 제목 5
###### 제목 6
####### 제목 7 (지원 않됨)
```
# 제목 1
## 제목 2
### 제목 3
#### 제목 4
##### 제목 5
###### 제목 6
####### 제목 7 (지원 않됨)

---
## 2. 줄바꿈 (Line Breaks)
* ```<br>``` 태그를 이용해서 줄바꿈을 사용할 수 있는데, 간단하게 **띄어쓰기 두 번**을 하고 enter을 누르면 줄을 바꿀 수 있음

```python
첫번째 문장입니다. <br>
두번째 문장입니다.  
세번째 문장입니다.  
네번째 문장입니다.
```
첫번째 문장입니다.<br>
두번째 문장입니다.  
세번째 문장입니다.  
네번째 문장입니다.

---
## 3. 목록 (List)
### 3-1) 순서가 있는 목록(번호)
* 순서가 있는 목록은 숫자와 점을 사용
```python
1. 첫번째
2. 두번째
3. 세번째
```
1. 첫번째
2. 두번째
3. 세번째

### 3-2) 순서가 없는 목록
* 순서가 없는 목록은 글머리 기호( *, +, - ) 를 사용
```python
+ 첫번째
+ 두번째
+ 세번째

- 첫번째
- 두번째
- 세번째

* 첫번째
* 두번째
* 세번째
```

```python
+ 첫번째
    + 두번째
        + 세번째
        
* 1단계
  - 2단계
    + 3단계
      + 4단계
```
+ 첫번째
    + 두번째
        + 세번째
        
* 1단계
  - 2단계
    + 3단계
      + 4단계


---
## 4. 인용문 (BlockQuote)
* ```>```을 사용하여 블럭인용문자를 삽입 할 수 있음

```python
> 첫번째 인용구입니다.
>> 두번째 인용구입니다.
>>> 세번째 인용구입니다.
```
> 첫번째 인용구입니다.
>> 두번째 인용구입니다.
>>> 세번째 인용구입니다.

---
## 5. 코드(Code)블럭
### 5-1) ```<pre><code>{code}</code></pre>``` 이용

```
<pre>
<code>
def print_text():
    print("Hello Wolrd!!")
</code>
</pre>
```

### 5-1) "```" 을 이용
* 코드블럭코드("```") 시작점에 사용하는 언어를 선언하여 문법강조(Syntax highlighting)이 가능
<pre>
<code>
```python
def print_text():
    print("Hello Wolrd!!")
```
</code>
</pre>

```python
def print_text():
    print("Hello Wolrd!!")
```

---
## 6. 수평선 (Horizontal Rule)
* 각 기호를 3개 이상 입력
* 마크다운 문서를 미리보기로 출력할 때 페이지 나누기 용도로 많이 사용

```python
* * *

***

*****

- - -

---------------------------------------
```
* * *

***

*****

- - -

---------------------------------------

---
## 7. 강조 (Emphasis)
```python 
*기울어진 글씨*
_기울어진 글씨_
**굵은 글씨**
__굵은 글씨__
~~취소선 글씨~~
```
*기울어진 글씨*
_기울어진 글씨_
**굵은 글씨**
__굵은 글씨__
~~취소선 글씨~~

---
## 8. 링크 (Links)
### 8-1) 참조링크
```python
[link keyword][id]
[id]: URL "Optional Title here"
```
Link: [Google][googlelink]  

[googlelink]: https://google.com "Go google"

### 8-2) 자동연결
일반적인 URL 혹은 이메일주소인 경우 적절한 형식으로 링크를 형성
```
* 외부링크: <http://example.com/>
* 이메일링크: <address@example.com>
```
* 외부링크 : <http://example.com/>
* E-mail Link : <address@example.com>

---
## 9. 이미지 (Image)
```python
![Markdown Image](asset/images/test_image.jpg "Tooltip Message")
```
![Markdown Image](https://user-images.githubusercontent.com/69428232/144952302-a7333133-4320-4079-9fdc-8382d18c136f.jpg "Tooltip Message")

이미지의 크기나 정렬은 html 문법을 이용  
```<img width="" height=""></img>```를 이용하며, 정렬을 위해서는 추가적으로 ```<div align="center"> </div> ``` 을 이용  
width, height에 직접 사이즈를 지정하거나 비율(%)로 지정 할 수 있음

```python
<img src="asset/images/test_image.jpg" width="450px" height="300px" title="px(픽셀) 크기 설정" alt="Markdown Image"></img><br/>
<div align="center">
  <img src="asset/images/test_image.jpg" width="20%">
</div>
```

<img src="https://user-images.githubusercontent.com/69428232/144952302-a7333133-4320-4079-9fdc-8382d18c136f.jpg" width="450px" height="300px" title="px(픽셀) 크기 설정" alt="Markdown Image"></img><br/>
<div align="center">
  <img src="https://user-images.githubusercontent.com/69428232/144952302-a7333133-4320-4079-9fdc-8382d18c136f.jpg" width="20%">
</div>

---
## 10. 표 (Table)
### 10-1) 일반적인 표
* 테이블 안에 ```|``` 파이프 기호를 사용하려면 파이프 기호 대신에 ```&#124;``` 를 입력

```python
|제목|&#124;내용&#124;|설명|
|------|---|---|
|테스트1|테스트2|테스트3|
|테스트1|테스트2|테스트3|
|테스트1|테스트2|테스트3|
```
|제목|&#124;내용&#124;|설명|
|------|---|---|
|테스트1|테스트2|테스트3|
|테스트1|테스트2|테스트3|
|테스트1|테스트2|테스트3|

### 10-2) 셀 정렬
* ```:``` 문자로 정렬을 정의
```python
|제목|내용|설명|
|:---|---:|:---:|
|왼쪽정렬|오른쪽정렬|중앙정렬|
|왼쪽정렬|오른쪽정렬|중앙정렬|
|왼쪽정렬|오른쪽정렬|중앙정렬|
```
|제목|내용|설명|
|:---|---:|:---:|
|왼쪽정렬|오른쪽정렬|중앙정렬|
|왼쪽정렬|오른쪽정렬|중앙정렬|
|왼쪽정렬|오른쪽정렬|중앙정렬|

### 10-3) 셀 확장
* 사이가 비어있으면 자동으로 확장
```python
|제목|내용|설명|
|:---|:---:|---:|
||중앙에서확장||
|||오른쪽에서 확장|
|왼쪽에서확장||
```
|제목|내용|설명|
|:---|:---:|---:|
||중앙에서확장||
|||오른쪽에서 확장|
|왼쪽에서확장||

### 10-4) 셀 강조
* 일반적인 text와 마찬가지로 ```*``` 와 ```**``` 를 통해 이탤릭/강조를 표시할 수 있습니다. ```span tag```를 사용하면 컬러도 표시 가능
```python
|제목|내용|설명|
|---|---|---|
|테스트1|*강조1*|테스트3|
|테스트1|**강조2**|테스트3|
|테스트1|<span style="color:red">강조3</span>|테스트3|
```
|제목|내용|설명|
|---|---|---|
|테스트1|*강조1*|테스트3|
|테스트1|**강조2**|테스트3|
|테스트1|<span style="color:red">강조3</span>|테스트3|


---
## 11. 각주 (Footnote)
```python
각주<sup>[1](#각주 이름)</sup>

<a name="각주 이름">1</a>: 각주에 대한 설명
```
각주<sup>[1](#각주 이름)</sup>

<a name="각주 이름">1</a>: 각주에 대한 설명

---
## 12. 접기 (Fold)
```python
<details><summary>Click Me</summary>
Good!!
</details>    
```
<details><summary>Click Me</summary>
Good!!
</details>    

---
## 13. 이스케이프 (Backslash Escapes)
* 마크다운으로 글을 작성하다 보면 ```*``` 문자나 ```_``` 문자 등을 사용하고 싶은 경우 ```\``` 문자로 회피
```python
강조는 \* 문자 혹은 \_ 문자를 사용
```
강조는 \* 문자 혹은 \_ 문자를 사용
