DROP TABLE AGENCY_STOCK_DATA;

CREATE TABLE AGENCY_STOCK_DATA (
	ID 				BIGINT(10) NOT NULL,
	REF_ID 			BIGINT(10) NOT NULL,				-- ID of the transaction of corresponding module
	STOCK_FLAG 		INT(1) NOT NULL DEFAULT 0,			-- FLAG for the module
	INV_NO 			VARCHAR(30) NOT NULL,
	TRANS_DATE 		BIGINT NOT NULL,
	TRANS_TYPE 		INT(1) NOT NULL,
	PROD_CODE 		INT(4) NOT NULL,
	PROD_ID 		BIGINT(10) NOT NULL,				-- APPLICABLE ONLY FOR ARB. 0 FOR OTHER PRODUCTS.
	FULLS 			INT(5) NOT NULL,
	EMPTIES 		INT(5) NOT NULL,
	CS_FULLS 		INT(4) NOT NULL,
	CS_EMPTYS		INT(4) NOT NULL,
	CVO_ID 			BIGINT NOT NULL,
	DISCOUNT 		VARCHAR(8) NOT NULL,

	CREATED_BY    	BIGINT(10) NULL,
	CREATED_DATE  	BIGINT NULL,
 	MODIFIED_BY   	BIGINT(10) NULL,
 	MODIFIED_DATE 	BIGINT NULL,
 	VERSION       	INT(1) NULL,
 	DELETED       	INT(1) NULL,
	CONSTRAINT AGENCY_STOCK_DATA_PK PRIMARY KEY (ID)
);
ALTER TABLE AGENCY_STOCK_DATA MODIFY COLUMN ID BIGINT(10) AUTO_INCREMENT;
ALTER TABLE AGENCY_STOCK_DATA AUTO_INCREMENT=1000001;

	CS_FULLS 		INT(4) NOT NULL,
	CS_EMPTYS		INT(4) NOT NULL,

-- TRANSACTION TYPES FOR AGENCY_STOCK_DATA:
-- 1 PURCHASE 			--- +
-- 2 SALE				--- -
-- 3 PURCHASE RETURN	--- -
-- 4 SALES RETURN		--- +
-- 5 NCDBC				--- Prod_code() > 9 --> -
-- 6 RC					--- No_of_reg() > 0 --> -
-- 7 TV					--- No_of_reg()>0 --> + , Prod_code() != 10 --> E+


-- STOCK_FLAG :
-- 1	CYLD PURCHASES
-- 2	ARB PURCHASES
-- 3	PURCHASE RETURN
-- 4	DOM SALES
-- 5	COM SALES
-- 6	ARB SALES
-- 7	SALES RETURN
-- 8	NCDBC
-- 9	RC
-- 10	TV

-- deleted = 1  ==>  deleted that product in equipment master. 	

select * from AgencyStockDataDO where created_by = 9250925 and deleted = 0 and prod_code = 2  and trans_date <= ?4 order by trans_date desc, created_date desc;

-------------------------------------------------------------------------------------------------------------------------------------------------------------------


CREATE TABLE CVO_BALANCE_DATA (
 ID 		  BIGINT(10) NOT NULL AUTO_INCREMENT,
 REF_ID 	  BIGINT(10) NOT NULL,
 CVOFLAG 	  INT(1) NOT NULL,
 INV_REF_NO   VARCHAR(30) NOT NULL,
 INV_DATE 	  BIGINT(20) NOT NULL,
 TRANS_TYPE   INT(1) NOT NULL,
 CVO_CAT 	  INT(1) NOT NULL,
 CVO_REFID 	  BIGINT(10) NOT NULL,
 AMOUNT 	  VARCHAR(13) NOT NULL,
 CBAL_AMOUNT  VARCHAR(20) NOT NULL,
 DISCOUNT 	  VARCHAR(10) NULL,
 CREATED_BY      		BIGINT(10) NULL,
 CREATED_DATE  			BIGINT NULL,
 MODIFIED_BY          	BIGINT(10) NULL,
 MODIFIED_DATE         	BIGINT NULL,
 VERSION               	INT(1) NULL,
 DELETED               	INT(1) NULL,

 CONSTRAINT CVO_BALANCE_DATA_PK PRIMARY KEY (ID)
);
-- ALTER TABLE CVO_BALANCE_DATA MODIFY COLUMN CBAL_AMOUNT VARCHAR(20) NOT NULL;
--     ALTER TABLE CVO_BALANCE_DATA MODIFY COLUMN AMOUNT VARCHAR(13) NOT NULL;


-- CVO_CAT:
-- 0 : VENDOR
-- 1 : CUSTOMER
-- 2 : OMC
-- 3 : OTHERS

-- TRANSACTION TYPE(ttype)
-- 0 : First Time login
-- 1 : Purchases (VENDOR   = 0)
-- 2 : Sales (CUSTOMER = 1)
-- 3 : RECEIPTS (CUSTOMER = 1)
-- 4 : PAYMENTS (VENDOR   = 0 & CUSTOMER = 1)
-- 5 : CREDITNOTE (CUSTOMER = 1)
-- 6 : DEBITNOTE (CUSTOMER = 1)
-- 7 : PURCASERETURN (VENDOR   = 0)
-- 8 : SALESRETURN (CUSTOMER = 1)

-- CVOFLAG:
-- cvoflag = 0  (First Time login and customer/vendor data adding)
-- cvoflag = 1 (ARBPurchases invoice)
-- cvoflag = 2 (OTHERPurchases invoice)

-- (DOMSales invoice)
-- cvoflag = 31 (Payment_terms=1)
-- cvoflag = 32 (Payment_terms=2)

-- (COMSales invoice)
-- cvoflag = 41 (Payment_terms=1)(for CASH)
-- cvoflag = 42 (Payment_terms=2)(for CREDIT)

-- (ARBSales invoice)
-- cvoflag = 51 (Payment_terms=1)(for CASH)
-- cvoflag = 52 (Payment_terms=2)(for CREDIT)

-- (RECEIPTS invoice)
-- cvoflag = 61  (Payment_terms=1)(for CASH)
-- cvoflag = 62  (Payment_terms=2)(for CHECK OR ONLINE TRANSFER)

-- (PAYMENTS invoice)
-- cvoflag = 71  (Payment_terms=1)(for CASH)
-- cvoflag = 72  (Payment_terms=2)(for CHECK OR ONLINE TRANSFER)

-- (CREDITNOTE)
-- cvoflag = 81 (Receive CreditNote) 
-- cvoflag = 82 (Issue CreditNote) 
		
-- (DEBITNOTE)
-- cvoflag = 91 (Receive DebitNote) 
-- cvoflag = 92 (Issue DebitNote)

-- cvoflag = 10  (FOR PURCASERETURN)
-- cvoflag = 11  (FOR SALESRETURN)








-- DROPPED
CREATE TABLE RECORDS_DELETED
(
/* ID BIGINT(10) NOT NULL,  */
 CYLINDER_PURCHASES_ID		BIGINT(10) DEFAULT 0,
 ARB_PURCHASES_ID 	    	BIGINT(10) DEFAULT 0,
 OTHER_PURCHASES_ID 		BIGINT(10) DEFAULT 0,
 PURCHASE_RETURN_ID			BIGINT(10) DEFAULT 0,
 DOM_SALES_ID 				BIGINT(10) DEFAULT 0,
 COM_SALES_ID 				BIGINT(10) DEFAULT 0,
 ARB_SALES_ID 				BIGINT(10) DEFAULT 0,
 QUOTATIONS_ID				BIGINT(10) DEFAULT 0,
 DELIVERY_CHALLAN_ID 		BIGINT(10) DEFAULT 0,
 SALES_RETURN_ID 			BIGINT(10) DEFAULT 0,
 NCDBC_ID 					BIGINT(10) DEFAULT 0,
 RC_ID 						BIGINT(10) DEFAULT 0,
 TV_ID 						BIGINT(10) DEFAULT 0,
 RECEIPTS_ID 				BIGINT(10) DEFAULT 0,
 PAYMENTS_ID 				BIGINT(10) DEFAULT 0,
 BANK_TRANSACTIONS_ID 		BIGINT(10) DEFAULT 0,
 CREDIT_NOTE_ID 			BIGINT(10) DEFAULT 0,
 DEBIT_NOTE_ID 				BIGINT(10) DEFAULT 0,

 CREATED_BY    				BIGINT(10) NOT NULL,
 CREATED_DATE  				BIGINT NULL,
 MODIFIED_BY   				BIGINT(10) NULL,
 MODIFIED_DATE 				BIGINT NULL,
 VERSION       				INT(1) NULL,
 DELETED       				INT(1) NULL,
/* CONSTRAINT RECORDS_DELETED_PK PRIMARY KEY (ID) */
 CONSTRAINT RECORDS_DELETED_PK PRIMARY KEY (CREATED_BY) 
);

ALTER TABLE RECORDS_DELETED CHANGE COLUMN IN_BANK_TRANSACTIONS_ID BANK_TRANSACTIONS_ID BIGINT(10) DEFAULT 0;
ALTER TABLE RECORDS_DELETED drop COLUMN OTHER_BANK_TRANSACTIONS_ID;

DROP TABLE RECORDS_DELETED;