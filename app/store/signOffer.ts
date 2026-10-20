export const useSignOffer = defineStore('signOffer', () => {
    const loanData = ref({
        amount: 10_000_000,
        requestNumber: 'LN-2048',
        bank: 'Название Банка',
        logo: 'eubank',
        program: 'Название программы',
        monthlyPayment: 451.32,
        interestRate: 7.9,
        term: 24,
        commission: 125,
        totalPayment: 18_310_000.68,
        repaymentMethod: 'Аннуитет',
        overpayment: 8_310_000.68,
    })

    const done = ref(false)
    const agreed = ref(false)
    const selectedCollateralIds = ref<(number | string)[]>([])

    return {
        loanData,
        done,
        agreed,
        selectedCollateralIds,
    }
})