export interface IssueDto {
    id: string;
    title: string;
    category: string;
    status: string;
    description: string;
}

export type IssueInputDto = Omit<IssueDto, 'id'>;