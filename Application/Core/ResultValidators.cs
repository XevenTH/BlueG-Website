namespace Application.Core;

public class ResultValidators<T>
{
    public bool isSucces { get; set; }
    public T Value { get; set; }
    public string Error { get; set; }


    public static ResultValidators<T> Valid(T activity) => new ResultValidators<T> { isSucces = true, Value = activity };
    public static ResultValidators<T> InValid(string ex) => new ResultValidators<T> { isSucces = false, Error = ex };
}
