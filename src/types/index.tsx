export type INote = {
  id?: number;
  title?: string;
  content?: string;
  color?: string;
  isFavorite?: string | boolean;
  user_id?: string;
};

export type INoteProps = {
  id: number;
  title: string;
  isFavorite: string;
  content: string;
  color: string;
};
