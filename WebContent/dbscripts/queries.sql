-- FINDING DUPLICATES IN GSTIN COLUMN:
SELECT GSTIN_NO,COUNT(GSTIN_NO) FROM AGENCY_DETAILS GROUP BY GSTIN_NO HAVING COUNT(GSTIN_NO)>1;

SELECT * FROM CVO_DATA;

SELECT * FROM EQUIPMENT_DATA;

DROP TABLE PAYMENTS_DATA;

SELECT * FROM DOM_SALES_INVOICES;

SELECT * FROM DOM_SALES_INVOICES_DETAILS;

SELECT * FROM ARB_PURCHASE_INVS;

SELECT * FROM ARB_SALES_INVOICES_DETAILS

SELECT * FROM ARB_SALES_INVOICES;

TRUNCATE TABLE BANK_DATA;
TRUNCATE TABLE BANK_TRANS_DATA;
TRUNCATE TABLE TV_DATA;


DROP TABLE DEBIT_NOTES;

DROP TABLE CREDIT_NOTES;

DROP TABLE SALES_RETURN_DETAILS;

DROP TABLE SALES_RETURN_DATA;

DROP TABLE PURCHASE_RETURN_DETAILS;

DROP TABLE PURCHASE_RETURN_DATA;

DROP TABLE CYLD_PURCHASE_INVS;

DROP TABLE ARB_PURCHASE_INVS;

DROP TABLE OTHER_PURCHASE_INVS;

DROP TABLE AGENCY_CASH_DATA;

DROP TRIGGER RECEIPTS_DATA_TRIG;

DROP TRIGGER PAYMENTS_DATA_TRIG;

DROP TRIGGER BANK_TRANS_DATA_TRIG;

DROP TRIGGER DOM_SALES_INVOICES_TRIG;

DROP TRIGGER COM_SALES_INVOICES_TRIG;

DROP TRIGGER ARB_SALES_INVOICES_TRIG;

DROP TRIGGER NCDBCRCTV_INVOICES_TRIG;

DROP TRIGGER RC_DATA_TRIG;

DROP TRIGGER TV_DATA_TRIG;

DROP TRIGGER ASSETS_DATA_TRIG;

DROP TRIGGER DOM_SALES_INVOICES_UPDATE_TRIG;

DROP TRIGGER COM_SALES_INVOICES_UPDATE_TRIG;

DROP TRIGGER ARB_SALES_INVOICES_UPDATE_TRIG;

DROP TRIGGER NCDBCRCTV_INVOICES_UPDATE_TRIG;

DROP TRIGGER RC_DATA_UPDATE_TRIG;

DROP TRIGGER TV_DATA_UPDATE_TRIG;

DROP TRIGGER ASSETS_DATA_UPDATE_TRIG;

DROP TRIGGER RECEIPTS_DATA_DELETE_TRIG;

DROP TRIGGER PAYMENTS_DATA_DELETE_TRIG;

DROP TRIGGER BANK_TRANS_DATA_DELETE_TRIG;

SELECT * FROM AGENCY_CASH_DATA;
DROP TABLE AGENCY_CASH_DATA;

INSERT INTO AGENCY_CASH_DATA(INV_NO,TRANS_TYPE,T_DATE,CASH_AMOUNT,CASH_BALANCE,CREATED_BY,CREATED_DATE,VERSION,DELETED) VALUES("NA",1,1518085460000,1000,1000,1234567890,1518085460000,1,0);
DELETE FROM AGENCY_CASH_DATA WHERE ID = 1000019;
UPDATE AGENCY_CASH_DATA SET  T_DATE = 1518114600000;
UPDATE CASH_TRANS_ENUM SET  ID = 8  WHERE TRANS_MODULE = "SALE";


