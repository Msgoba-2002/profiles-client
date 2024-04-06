export interface CreateQuestionDto {
  question: string;
  options: string[];
  correct_option: number;
}

export interface UpdateQuestionDto extends Partial<CreateQuestionDto> { }

export interface UpdateQuestionForm {
  question: string;
  option_a: string;
  option_b: string;
  option_c: string;
  correct_answer: number;
}

export interface CreateQuestionForm extends UpdateQuestionForm { }

export interface IQuestion {
  id: string;
  question: string;
  options: string[];
}

export interface QuestionCreateResponse extends IQuestion {
  correct_option: number;
}