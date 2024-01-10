export interface CodesInterface  {
    page_name: string,
    code_name:string,
    api:string,
    parent_api: string
}
export const Codes: CodesInterface[] = [
    {page_name: "فئات المقتنيات", parent_api: "",  code_name: "أسم الفئة", api: "item_category"},
    {page_name: "شركات التقييم", parent_api: "",  code_name: "أسم الشركة", api: "grading_company"},
    // {page_name: "", parent_api: "",  code_name: "", api: ""},

] 