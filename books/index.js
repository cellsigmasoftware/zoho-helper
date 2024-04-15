const ZohoAuth = require("./../zoho/auth.zoho");

class Books extends ZohoAuth {
    constructor(_uniq_name,_client_id, _client_secret, _refresh_token) {
        super(_uniq_name,_client_id, _client_secret, _refresh_token)
    }

    /**
     *
     * @param org_id
     * @param parameters
     * @returns {Promise<*|undefined>}
     */
    async createBankAccount(org_id,parameters) {
        try {
            return await this.customRequest(`https://books.zoho.com/api/v3/bankaccounts?organization_id=${org_id}`, "POST",parameters);
        } catch (e) {
            if (e.response !== undefined)
                console.error(e.response.data);
            else
                console.error(e.message);
        }
    }

    /**
     *
     * @param org_id
     * @returns {Promise<*|undefined>}
     */
    async getCurrencies(org_id) {
        const token = await this.getToken();
        try {
            return await this.customRequestV2(`https://books.zoho.com/api/v3/settings/currencies?organization_id=${org_id}`, "GET");
        } catch (e) {
            if (e.response !== undefined)
                console.error(e.response.data);
            else
                console.error(e.message);
        }
    }

      /**
     *
     * @param org_id
     * @returns {Promise<*|undefined>}
     */
      async getCustomers(org_id) {
        let page = 1;
        let perPage = 200; // Maximum allowed by Zoho Books API
        let allCustomers = [];
    
        try {
            while (true) {
                const response = await this.customRequestV2(`https://books.zoho.com/api/v3/contacts?organization_id=${org_id}&page=${page}&per_page=${perPage}`, "GET");
    
                // Check if the response contains the expected data
                if (!response || !response.contacts) {
                    console.error('Unexpected response structure:', response);
                    break;
                }
    
                // Add the customers from the current page to the allCustomers array
                allCustomers = allCustomers.concat(response.contacts);
    
                // Check if there are more pages to fetch
                const hasMorePages = response.page_context && response.page_context.has_more_page;
                if (!hasMorePages) {
                    break; // No more pages to fetch
                }
    
                page++; // Move to the next page
            }
        } catch (error) {
            console.error('Error fetching customers:', error);
        }
    
        return allCustomers;
    }




    async postContacts(org_id,contactDetails){
        const token = await this.getToken();
        const url = `https://books.zoho.com/api/v3/contacts?organization_id=${org_id}`;
        const method = "POST";
        try {
            const response = await this.customRequestV3(url, method, contactDetails, org_id);
            return response; // The response should contain the created contact details
        } catch (error) {
            console.error("Error creating contact:", error);
            return null;
        }


    }

    /**
     *
     * @param org_id
     * @returns {Promise<*|undefined>}
     */

    async getVendors(org_id) {
        let page = 1;
        let allVendors = [];
    
        try {
            while (true) {
                const response = await this.customRequestV2(`https://books.zoho.com/api/v3/vendors?organization_id=${org_id}&page=${page}`, "GET");
    
                // Check if the response contains the expected data
                if (!response || !response.contacts) {
                    console.error('Unexpected response structure:', response);
                    break;
                }
    
                // Add the vendors from the current page to the allVendors array
                allVendors = allVendors.concat(response.contacts);
    
                // Check if there are more pages to fetch
                const hasMorePages = response.page_context && response.page_context.has_more_page;
                if (!hasMorePages) {
                    break; // No more pages to fetch
                }
    
                page++; // Move to the next page
            }
        } catch (error) {
            console.error('Error fetching vendors:', error);
        }
    
        return allVendors;
    }

    /**
     *
     * @returns {Promise<*|undefined>}
     */
    async getOrganizationId() {
        const token = await this.getToken();
        try {
            return await this.customRequestV2(`https://books.zoho.com/api/v3/organizations`, "GET");
        } catch (e) {
            if (e.response !== undefined)
                console.error(e.response.data);
            else
                console.error(e.message);
        }
    }

    /**
     *
     * @param org_id
     * @param parameters
     * @returns {Promise<*|undefined>}
     */
    async addTransactions(org_id,parameters) {
        const token = await this.getToken();
        try {
            return await this.customRequest(`https://books.zoho.com/api/v3/banktransactions?organization_id=${org_id}`, "POST",parameters);
        } catch (e) {
            if (e.response !== undefined)
                console.error(e.response.data);
            else
                console.error(e.message);
        }
    }

    /**
     *
     * @param org_id
     * @param parameters
     * @returns {Promise<*|undefined>}
     */
    async addExpense(org_id,parameters) {
        const token = await this.getToken();
        try {
            return await this.customRequest(`https://books.zoho.com/api/v3/expenses?organization_id=${org_id}`, "POST",parameters);
        } catch (e) {
            if (e.response !== undefined)
                console.error(e.response.data);
            else
                console.error(e.message);
        }
    }

    /**
     *
     * @param org_id
     * @returns {Promise<*|undefined>}
     */
    async getExpenses(org_id) {
        const token = await this.getToken();
        try {
            return await this.customRequestV2(`https://books.zoho.com/api/v3/expenses?organization_id=${org_id}`, "GET");
        } catch (e) {
            if (e.response !== undefined)
                console.error(e.response.data);
            else
                console.error(e.message);
        }
    }

    /**
     *
     * @param org_id
     * @returns {Promise<*|undefined>}
     */
    async getChartOfAccounts(org_id) {
        const token = await this.getToken();
        try {
            return await this.customRequestV2(`https://books.zoho.com/api/v3/chartofaccounts?organization_id=${org_id}`, "GET");
        } catch (e) {
            if (e.response !== undefined)
                console.error(e.response.data);
            else
                console.error(e.message);
        }
    }

    /**
     *
     * @param org_id
     * @returns {Promise<*|undefined>}
     */
    async getChartOfAccounts(org_id) {
        const token = await this.getToken();
        try {
            return await this.customRequestV2(`https://books.zoho.com/api/v3/chartofaccounts?organization_id=${org_id}`, "GET");
        } catch (e) {
            if (e.response !== undefined)
                console.error(e.response.data);
            else
                console.error(e.message);
        }
    }

    /**
     *
     * @param org_id
     * @returns {Promise<*|undefined>}
     */
    async getExpenseList(org_id) {
        const token = await this.getToken();
        try {
            return await this.customRequestV2(`https://books.zoho.com/api/v3/expenses?organization_id=${org_id}`, "GET");
        } catch (e) {
            if (e.response !== undefined)
                console.error(e.response.data);
            else
                console.error(e.message);
        }
    }

    /**
     *
     * @param org_id
     * @returns {Promise<*|undefined>}
     */
    async getCurrencies(org_id) {
        try {
            return await this.customRequestV2(`https://books.zoho.com/api/v3/settings/currencies?organization_id=${org_id}`, "GET");
        }catch (e) {
            if (e.response !== undefined)
                console.error(e.response.data);
            else
                console.error(e.message);
        }
    }

    /**
     *
     * @param org_id
     * @returns {Promise<*|undefined>}
     */
    async chartOfAccounts(org_id) {
        let page = 1;
        let allResults = [];
    
        try {
            let hasMorePages = true;
            while (hasMorePages) {
                const response = await this.customRequestV2(`https://books.zoho.com/api/v3/chartofaccounts?organization_id=${org_id}&page=${page}`, "GET");
                const results = response.data;
                allResults = allResults.concat(results);
    
                // Check if there are more pages
                hasMorePages = response.pagination && response.pagination.total_pages > page;
                page++;
            }
            return allResults;
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    /**
     *
     * @param org_id
     * @returns {Promise<*|undefined>}
     */
    async getAllBankv2(org_id) {
        try {
            return await this.customRequestV2(`https://books.zoho.com/api/v3/bankaccounts?organization_id=${org_id}`, "GET");
        }catch (e) {
            if (e.response !== undefined)
                console.error(e.response.data);
            else
                console.error(e.message);
        }
    }

    /**
     *
     * @param org_id
     * @param parameters
     * @param transaction_id
     * @returns {Promise<*|undefined>}
     */
    async uncategorizeTransactions(org_id,parameters,transaction_id) {
        const token = await this.getToken();
        try {
            return await this.customRequestV5(`https://books.zoho.com/api/v3/banktransactions/${transaction_id}/uncategorize?organization_id=${org_id}`, "POST",parameters);
        } catch (e) {
            if (e.response !== undefined)
                console.error(e.response.data);
            else
                console.error(e.message);
        }
    }

    /**
     *
     * @param org_id
     * @returns {Promise<*|undefined>}
     */
    async getAllTransactions(org_id) {
        try {
            return await this.customRequestV2(`https://books.zoho.com/api/v3/banktransactions?organization_id=${org_id}`, "GET");
        }catch (e) {
            if (e.response !== undefined)
                console.error(e.response.data);
            else
                console.error(e.message);
        }
    }

    /**
     *
     * @param org_id
     * @param parameters
     * @returns {Promise<*|undefined>}
     */
    async addStatments(org_id,parameters) {
        const token = await this.getToken();
        try {
            return await this.customRequestV5(`https://books.zoho.com/api/v3/bankstatements?organization_id=${org_id}`, "POST",parameters);
        } catch (e) {
            if (e.response !== undefined)
                console.error(e.response.data);
            else
                console.error(e.message);
        }
    }

    /**
     *
     * @param org_id
     * @param parameters
     * @param transaction_id
     * @returns {Promise<*|undefined>}
     */
    async deleteTransactions(org_id,parameters,transaction_id) {
        const token = await this.getToken();
        try {
            return await this.customRequestV6(`https://books.zoho.com/api/v3/banktransactions/${transaction_id}?organization_id=${org_id}`, "DELETE",parameters);
        } catch (e) {
            if (e.response !== undefined)
                console.error(e.response.data);
            else
                console.error(e.message);
        }
    }

    /**
     *
     * @param org_id
     * @param parameters
     * @param transaction_id
     * @returns {Promise<*|undefined>}
     */
    async deleteTransactions(org_id,parameters,transaction_id) {
        const token = await this.getToken();
        try {
            return await this.customRequestV6(`https://books.zoho.com/api/v3/banktransactions/${transaction_id}?organization_id=${org_id}`, "DELETE",parameters);
        } catch (e) {
            if (e.response !== undefined)
                console.error(e.response.data);
            else
                console.error(e.message);
        }
    }

    /**
     *
     * @param org_id
     * @param parameters
     * @returns {Promise<*|undefined>}
     */
    async createBalance(org_id,parameters) {
        const token = await this.getToken();
        try {
            return await this.customRequestV6(`https://books.zoho.com/api/v3/settings/openingbalances?organization_id=${org_id}`, 'POST',parameters)
        }catch (e) {
            if (e.response !== undefined)
                console.log(e.response.data);
            else
                console.error(e.message)
        }
    }

    /**
     *
     * @param org_id
     * @param parameters
     * @returns {Promise<*|undefined>}
     */
    async deleteBalance(org_id,parameters) {
        const token = await this.getToken();
        try {
            return await this.customRequestV6(`https://books.zoho.com/api/v3/settings/openingbalances?organization_id=${org_id}`, 'DELETE',parameters)
        }catch (e) {
            if (e.response !== undefined)
                console.log(e.response.data);
            else
                console.error(e.message)
        }
    }

    /**
     *
     * @param org_id
     * @param parameters
     * @returns {Promise<*|undefined>}
     */
    async getBalance(org_id,parameters) {
        const token = await this.getToken();
        try {
            return await this.customRequestV6(`https://books.zoho.com/api/v3/settings/openingbalances?organization_id=${org_id}`, 'GET',parameters)
        }catch (e) {
            if (e.response !== undefined)
                console.log(e.response.data);
            else
                console.error(e.message)
        }
    }

    /**
     *
     * @param org_id
     * @param parameters
     * @returns {Promise<*|undefined>}
     */
    async updateBalance(org_id,parameters) {
        const token = await this.getToken();
        try {
            return await this.customRequestV6(`https://books.zoho.com/api/v3/settings/openingbalances?organization_id=${org_id}`, 'PUT',parameters)
        }catch (e) {
            if (e.response !== undefined)
                console.log(e.response.data);
            else
                console.error(e.message)
        }
    }

    /**
     *
     * @param org_id
     * @param parameters
     * @returns {Promise<*|undefined>}
     */
    async getTransactionList(org_id,parameters) {
        const token = await this.getToken();
        try {
            return await this.customRequestV6(`https://books.zoho.com/api/v3/settings/banktransactions?organization_id=${org_id}`, 'GET',parameters)
        }catch (e) {
            if (e.response !== undefined)
                console.log(e.response.data);
            else
                console.error(e.message)
        }
    }


}


module.exports = Books;
