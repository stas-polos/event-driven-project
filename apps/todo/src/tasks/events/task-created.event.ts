export class TaskCreated {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly description: string,
  ) {}
}
