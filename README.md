# 파일 확장자 차단 프로젝트

## 요구사항

1. **고정 확장자**

   * 자주 차단되는 확장자 (기본 unCheck)
   * 체크 상태 변경 시 DB 반영 및 새로고침 후 유지

2. **확장자 입력**

   * 최대 20자리 제한
   * 추가 시 DB 저장 및 목록 표시

3. **커스텀 확장자**

   * 최대 200개 등록 가능
   * X 버튼 클릭 시 DB 삭제

---

## 시스템 구조

```
controller/   → API & 라우팅
service/      → 비즈니스 로직
dao/          → MyBatis DAO
dto/          → 데이터 객체
resources/
  ├─ static/js, css
  ├─ templates/
  └─ mappers/FileExtensionMapper.xml
```

---

## 데이터베이스 설계

```sql
CREATE TABLE file_extensions (
    id SERIAL PRIMARY KEY,
    extension_name VARCHAR(20) UNIQUE NOT NULL,
    extension_type VARCHAR(10) NOT NULL,  -- FIXED / CUSTOM
    is_checked CHAR(1) DEFAULT 'N',
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
```

- **UNIQUE 제약**으로 중복 방지
- **is\_checked**로 체크박스 상태 저장

---

## 설계 포인트

- **백엔드**: 단순 CRUD, Controller–Service–DAO 계층 분리
- **프론트엔드**:
  - 입력 검증(길이, 중복, 특수문자)
  - 실시간 피드백 & 제한(200개, 20자)
  - 신규 항목은 상단 배치로 가시성 확보
- **검증 전략**:
  - 주요 제약은 프론트 처리
  - 백엔드는 CRUD + 무결성 보장


