export interface Note {
  id: number;
  title: string;
  content: string;
  createDate: Date;
  completeDate: Date;
  editDate: Date;
  status: boolean;
}
