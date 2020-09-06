export interface RequestSuccessfullInterface<DataType> {
  ok: boolean;
  data?: DataType;
  error: null;
}

export interface RequestErrorInterface {
  ok: boolean;
  data: null;
  error: {
    code: number;
    message: string;
  };
}
