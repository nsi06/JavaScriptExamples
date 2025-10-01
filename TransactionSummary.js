function summarizeTransactions(transactions) {
    const summary = [];

    for (let tx of transactions) {
        const [customerId, type, amountStr] = tx.split(" ");
        const amount = parseInt(amountStr, 10);

        if (!summary[customerId]) {
            summary[customerId] = { deposit: 0, withdrawal: 0 };
        }

        if (type === "DEPOSIT") {
            summary[customerId].deposit = summary[customerId].deposit + amount;
        } else if (type === "WITHDRAWAL") {
            summary[customerId].withdrawal = summary[customerId].withdrawal + amount;
        }
    }

    const customers = Object.keys(summary).sort();

    return customers.map(customer => {
        const dep = summary[customer].deposit;
        const wit = summary[customer].withdrawal;
        const balance = dep - wit;
        return `${customer} ${dep} ${wit} ${balance}`;
    });
}

const input = [
    "C123 DEPOSIT 200",
    "C123 WITHDRAWAL 50",
    "C101 DEPOSIT 100",
    "C123 DEPOSIT 300"
];

const output = summarizeTransactions(input);
console.log(output.join("\n"));
