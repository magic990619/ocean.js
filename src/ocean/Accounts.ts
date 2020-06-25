import Account from './Account'
import { Instantiable, InstantiableConfig } from '../Instantiable.abstract'

/**
 * Account submodule of Ocean Protocol.
 */
export class Accounts extends Instantiable {
    /**
     * Returns the instance of OceanAccounts.
     * @return {Promise<OceanAccounts>}
     */
    public static async getInstance(config: InstantiableConfig): Promise<Accounts> {
        const instance = new Accounts()
        instance.setInstanceConfig(config)

        return instance
    }

    /**
     * Returns the list of accounts.
     * @return {Promise<Account[]>}
     */
    public async list(): Promise<Account[]> {
        // retrieve eth accounts
        const ethAccounts: string[] = await this.web3.eth.getAccounts()

        const accountPromises = ethAccounts.map(
            (address) => new Account(address, this.instanceConfig)
        )
        return Promise.all(accountPromises)
    }

    /**
     * Return account balance.
     * @param  {String}          TokenAddress .
     * @param  {Account}          account Account instance.
     * @return {Promise<Balance>}         Ether and Ocean Token balance.
     */
    public balance(TokenAddress: string, account: Account): Promise<number> {
        return account.getTokenBalance(TokenAddress)
    }

    /**
     * Return account balance in ETH
     * @param  {Account}          account Account instance.
     * @return {Promise<Balance>}         Ether and Ocean Token balance.
     */
    public ETHbalance(account: Account): Promise<number> {
        return account.getEtherBalance()
    }
}