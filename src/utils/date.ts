import { format } from "date-fns";

export const formatDate = (dateString: string, pattern: string) => {
    return format(new Date(dateString), pattern);
};