package com.it.diesuiteapp.framework;


import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.it.diesuiteapp.framework.bos.AgencyCVOBalanceDataBO;
import com.it.diesuiteapp.framework.bos.BankDataBO;
import com.it.diesuiteapp.framework.bos.CVODataBO;
import com.it.diesuiteapp.framework.bos.FleetDataBO;
import com.it.diesuiteapp.framework.bos.UserDataBO;
import com.it.diesuiteapp.framework.managers.MasterDataPersistenceManager;
import com.it.diesuiteapp.framework.model.AgencyCVOBalanceDataDO;
import com.it.diesuiteapp.framework.model.BankDataDO;
import com.it.diesuiteapp.framework.model.CVODataDO;
import com.it.diesuiteapp.framework.model.FleetDataDO;
import com.it.diesuiteapp.framework.model.UserDetailsDO;
import com.it.diesuiteapp.systemservices.exceptions.BusinessException;



public class MasterDataFactory {

	private MasterDataPersistenceManager getMasterDataPersistenceManager(){
		return new MasterDataPersistenceManager();
	}
	public List<UserDetailsDO> getAdminUserData(long adminId) throws BusinessException{
		return getMasterDataPersistenceManager().getAdminUserData(adminId);
	}

	public List<UserDetailsDO> saveAdminUserData(Map<String, String[]> requestParams, long adminId) throws BusinessException{
		String[] userid = requestParams.get("u_code");
		String[] username = requestParams.get("u_name");
		String[] usermobile = requestParams.get("u_mobile");
		String[] useremail = requestParams.get("u_email");
		String[] address = requestParams.get("u_address");
		String[] passcode = requestParams.get("u_pwd");
		List<UserDetailsDO> doList = new ArrayList<>();
		UserDataBO udbo = new UserDataBO();
		for(int i=0; i<userid.length;i++){
			doList.add(udbo.createDO(Long.parseLong(userid[i]), username[i], 
					passcode[i],usermobile[i], useremail[i], address[i],adminId));
		}
		getMasterDataPersistenceManager().saveAdminUserData(doList);
		return getMasterDataPersistenceManager().getAdminUserData(adminId);
	}

	public List<UserDetailsDO> deleteAgencyStatutoryData(long itemId,long adminId) throws BusinessException{
		getMasterDataPersistenceManager().deleteAdminUserData(itemId);
		return getMasterDataPersistenceManager().getAdminUserData(adminId);
	}

	
	//CVO Data
		public List<CVODataDO> getAdminCVOData(long adminId) throws BusinessException {
			return getMasterDataPersistenceManager().getAdminCVOData(adminId);
		}
		//CVO Data
		public List<CVODataDO> getAdminAllCVOData(long adminId) throws BusinessException {
			return getMasterDataPersistenceManager().getAdminAllCVOData(adminId);
		}

		public List<CVODataDO> saveAdminCVOData(Map<String, String[]> requestParams, 
				long agencyId) throws BusinessException{
			
			String[] names = requestParams.get("cvo_name");
			String[] caddrs = requestParams.get("cvo_addr");
			String[] categorys = requestParams.get("cvo_cat");
			String[] contacts = requestParams.get("cvo_contact");
			String[] gstyns = requestParams.get("gstyn");
			String[] tins = requestParams.get("cvo_tin");
			String[] emails = requestParams.get("cvo_email");
			String[] pans = requestParams.get("cvo_pan");
			String[] balances = requestParams.get("cvo_ob");

			List<CVODataDO> doList = new ArrayList<>();
			CVODataBO cvobo = new CVODataBO();
			
			List<AgencyCVOBalanceDataDO> acvoDOList = new ArrayList<>();
			AgencyCVOBalanceDataBO acvoBalBO = new AgencyCVOBalanceDataBO();
			
			for(int i=0; i<names.length; i++) {
				doList.add(cvobo.createDO(names[i], contacts[i], caddrs[i], Integer.parseInt(gstyns[i]), tins[i], 
						emails[i], pans[i],balances[i], Integer.parseInt(categorys[i]), agencyId));
				
				acvoDOList.add(acvoBalBO.createDO(balances[i], Integer.parseInt(categorys[i]), agencyId,0,"NA",0,0,"0","NA"));
			}
			getMasterDataPersistenceManager().saveAdminCVOData(doList, acvoDOList); 
			return getMasterDataPersistenceManager().getAdminCVOData(agencyId);
		}
		
		public List<CVODataDO> deleteAgencyCVOData(long cvoDataId,long agencyId) throws BusinessException{
			getMasterDataPersistenceManager().deleteAdminCVOData(cvoDataId);
			return getMasterDataPersistenceManager().getAdminCVOData(agencyId);
		}
	/*//Staff Data
	public List<StaffDataDO> getAgencyStaffData(long agencyId) throws BusinessException{
		return getMasterDataPersistenceManager().getAgencyStaffData(agencyId);
	}
	
	//Staff Data
		public List<StaffDataDO> getAgencyAllStaffData(long agencyId) throws BusinessException{
			return getMasterDataPersistenceManager().getAgencyAllStaffData(agencyId);
		}

	public List<StaffDataDO> saveAgencyStaffData(Map<String, String[]> requestParams, long agencyId) throws BusinessException{
		String[] empCodes = requestParams.get("s_code");
		String[] empNames = requestParams.get("s_name");
		String[] dobs = requestParams.get("s_dob");
		String[] designations = requestParams.get("s_designation");
		String[] roles = requestParams.get("s_role");
		List<StaffDataDO> doList = new ArrayList<>();
		StaffDataBO sdbo = new StaffDataBO();
		for(int i=0; i<empCodes.length;i++){
			doList.add(sdbo.createDO(empCodes[i], empNames[i], dobs[i], 
					designations[i], Integer.parseInt(roles[i]), agencyId));
		}
		getMasterDataPersistenceManager().saveAgencyStaffData(doList); 
		return getMasterDataPersistenceManager().getAgencyStaffData(agencyId);
	}

	public List<StaffDataDO> deleteAgencyStaffData(long itemId,long agencyId) throws BusinessException{
		getMasterDataPersistenceManager().deleteAgencyStaffData(itemId);
		return getMasterDataPersistenceManager().getAgencyStaffData(agencyId);
	}
*/
	//Fleet Data
	public List<FleetDataDO> getAgencyFleetData(long agencyId) throws BusinessException{
		return getMasterDataPersistenceManager().getAgencyFleetData(agencyId);
	}
	//Fleet Data
	public List<FleetDataDO> getAgencyAllFleetData(long agencyId) throws BusinessException{
		return getMasterDataPersistenceManager().getAgencyAllFleetData(agencyId);
	}

	public List<FleetDataDO> saveAgencyFleetData(Map<String, String[]> requestParams, long adminId) throws BusinessException{
		String[] vnos = requestParams.get("vh_no");
		String[] vmakes = requestParams.get("vh_make");
		String[] vtypes = requestParams.get("vh_type");
		String[] vusages = requestParams.get("vh_usage");
		List<FleetDataDO> doList = new ArrayList<>();
		FleetDataBO fdbo = new FleetDataBO();
		for(int i=0; i<vnos.length;i++){
			doList.add(fdbo.createDO(vnos[i], vmakes[i], Integer.parseInt(vtypes[i]), Integer.parseInt(vusages[i]), adminId));
		}
		getMasterDataPersistenceManager().saveAgencyFleetData(doList); 
		return getMasterDataPersistenceManager().getAgencyFleetData(adminId);
	}

	public List<FleetDataDO> deleteAgencyFleetData(long fleetId,long adminId) throws BusinessException{
		getMasterDataPersistenceManager().deleteAgencyFleetData(fleetId);
		return getMasterDataPersistenceManager().getAgencyFleetData(adminId);
	}

	//Bank Data
	public List<BankDataDO> getAgencyBankData(long adminId) throws BusinessException{
		return getMasterDataPersistenceManager().getAgencyBankData(adminId);
	}
	

		//Bank Data
	public List<BankDataDO> getAgencyAllBankData(long adminId) throws BusinessException{
		return getMasterDataPersistenceManager().getAgencyAllBankData(adminId);
	}

	public List<BankDataDO> saveAgencyBankData(Map<String, String[]> requestParams, long adminId) throws BusinessException{
		String[] codes = requestParams.get("bank_code");
		String[] names = requestParams.get("bank_name");
		String[] accnos = requestParams.get("bank_accno");
		String[] branches = requestParams.get("bank_branch");
		String[] ifsccodes = requestParams.get("bank_ifsc");
		String[] balances = requestParams.get("bank_ob");
		String[] addresses = requestParams.get("bank_addr");
		String[] dlBal = requestParams.get("DLbal");
		
		List<BankDataDO> doList = new ArrayList<>();
		BankDataBO bdbo = new BankDataBO();
		for(int i=0; i<codes.length; i++) {
			doList.add(bdbo.createDO(codes[i], names[i], accnos[i], branches[i], ifsccodes[i], balances[i], addresses[i], dlBal[i], adminId));
		}
		getMasterDataPersistenceManager().saveAgencyBankData(doList);
		return getMasterDataPersistenceManager().getAgencyAllBankData(adminId);
	}

	public List<BankDataDO> deleteAgencyBankData(long bankDataId,long agencyId) throws BusinessException{
		getMasterDataPersistenceManager().deleteAgencyBankData(bankDataId);
		return getMasterDataPersistenceManager().getAgencyAllBankData(agencyId);
	}
	
	

/*	//Expenditure Data
	public List<ExpenditureDataDO> getAgencyExpenditureData(long agencyId) throws BusinessException{
		return getMasterDataPersistenceManager().getAgencyExpenditureData(agencyId);
	}

	public List<ExpenditureDataDO> saveAgencyExpenditureData(Map<String, String[]> requestParams, long agencyId) throws BusinessException{
		List<ExpenditureDataDO> doList = new ArrayList<>();
		ExpenditureDataBO ebo = new ExpenditureDataBO();
		String[] item_names = requestParams.get("item_name");
		String[] shs = requestParams.get("esh");
		String[] mhs = requestParams.get("emh");
		for(int i=0; i<item_names.length; i++) {
			doList.add(ebo.createDO(item_names[i], Integer.parseInt(shs[i]), Integer.parseInt(mhs[i]), agencyId));
		}
		getMasterDataPersistenceManager().saveAgencyExpenditureData(doList); 
		return getMasterDataPersistenceManager().getAgencyExpenditureData(agencyId);
	}

	public List<ExpenditureDataDO> deleteAgencyExpenditureData(long expDataId,long agencyId) throws BusinessException{
		getMasterDataPersistenceManager().deleteAgencyExpenditureData(expDataId);
		return getMasterDataPersistenceManager().getAgencyExpenditureData(agencyId);
	}

	
	private MasterDataPersistenceManager getMasterDataPersistenceManager(){
		return new MasterDataPersistenceManager();
	}

	//Credit Limits Data
	public List<CreditLimitsDataDO> getAgencyCreditLimitsData(long agencyId) throws BusinessException{
		return getMasterDataPersistenceManager().getAgencyCreditLimitsData(agencyId);
	}

	public void saveAgencyCreditLimitsData(Map<String, String[]> requestParams, long agencyId) throws BusinessException{
		List<CreditLimitsDataDO> doList = new ArrayList<>();
		CreditLimitsDataBO dataBO = new CreditLimitsDataBO();
		String[] cust_ids = requestParams.get("cid");
		String[] cls = requestParams.get("cl");
		String[] cds = requestParams.get("cd");
		
		String[] discountCcyl1 = requestParams.get("ccyl1");
		String[] discountCcyl2 = requestParams.get("ccyl2");
		String[] discountCcyl3 = requestParams.get("ccyl3");
		String[] discountCcyl4 = requestParams.get("ccyl4");
		String[] discountCcyl5 = requestParams.get("ccyl5");

		String[] ccs = requestParams.get("cc");
		for(int i=0; i<cust_ids.length; i++) {
			doList.add(dataBO.createDO(Long.parseLong(cust_ids[i]), cls[i],Integer.parseInt(cds[i]),discountCcyl1[i],
					discountCcyl2[i], discountCcyl3[i],discountCcyl4[i],discountCcyl5[i],	 Integer.parseInt(ccs[i]), agencyId));
			}
		getMasterDataPersistenceManager().saveAgencyCreditLimitsData(doList); 
		
	}

	public void deleteAgencyCreditLimitsData(long clDataId,long agencyId) throws BusinessException{
		getMasterDataPersistenceManager().deleteAgencyCreditLimitsData(clDataId);
	}
	
	public void updateCreditlimitsData(Map<String, String> requestParams, long agencyId) throws BusinessException{

		getMasterDataPersistenceManager().updateCreditlimitsData(requestParams,agencyId);

	}
*/

}
