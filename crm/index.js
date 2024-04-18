const ZohoAuth = require("./../zoho/auth.zoho");

class CRM extends ZohoAuth {
  constructor(uniq_name, client_id, client_secret, refresh_token) {
    super(uniq_name, client_id, client_secret, refresh_token);
  }

  /**
   *
   * @param formName
   * @param sIndex
   * @param limit
   * @returns {Promise<*|undefined>}
   */
  async getForms(formName, sIndex = 1, limit = 200) {
    try {
      return await this.customRequest(
        `https://people.zoho.com/people/api/forms/${formName}/getRecords?sIndex=${sIndex}&limit=${limit}`,
        "POST"
      );
    } catch (e) {
      if (e.response !== undefined) console.error(e.response.data);
      else console.error(e.message);
    }
  }

  async fetchAccounts(org_id) {
    let page = 1;
    let allAccounts = [];

    while (true) {
      const url = `https://www.zohoapis.com/crm/v2/Accounts?organization_id=${org_id}&page=${page}`;
      const method = "GET";
      const token = await this.getToken();

      try {
        const response = await this.customRequestV2(url, method);

        // Assuming the response structure is something like {info: {more_records: true/false}, data: [...]}
        if (response.info.more_records) {
          allAccounts = allAccounts.concat(response.data);
          page += 1; // Move to the next page
        } else {
          allAccounts = allAccounts.concat(response.data);
          break; // No more records to fetch
        }
      } catch (error) {
        console.error("Error fetching accounts:", error);
        return null;
      }
    }

    return allAccounts;
  }
  async createAccounts(org_id, data) {
    const url = `https://www.zohoapis.com/crm/v2/Accounts?organization_id=${org_id}`;
    const token = await this.getToken();
    const method = "POST";

    try {
      const response = await this.customRequestV2(url, method, data);
      console.log("Account Created: ", response);
    } catch (error) {
      console.error("Failed to create account: ", error);
    }
  }
}

module.exports = CRM;
