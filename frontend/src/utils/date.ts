
export const formatDate = (inputDate: string): string =>  {
    /*
        inputDate: "2023-08-15T03:01:08+00:00";
        return: "15/08/2023"
    */
    const date: Date = inputDate ? new Date(inputDate) : new Date();
    const day = padWithZeros(date.getDate(), 2)
    const month = padWithZeros(date.getMonth(), 2)
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
}


function padWithZeros(value: any, length: number): string {
    const stringValue: string = String(value);
    return stringValue.padStart(length, '0');
}

export const getDateDetails = (date?: any): {maxDate: string, formattedDateParsed:string} => {
    const dateParsed: Date = date ? new Date(date) : new Date();
    const day: string = padWithZeros(dateParsed, 2);
    const month: string = padWithZeros(dateParsed.getMonth() + 1, 2);
    const year: number = dateParsed.getFullYear();

    const formattedDateParsed: string = `${year}-${month}-${day}`;
    const maxDate: string = `${year + 1}-${month}-${day}`;

    return { formattedDateParsed, maxDate };
};


