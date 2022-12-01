namespace Application.Core.Paging;

public class PagingParams
{
    private const int MaxPageSize = 50;
    public int PageNumber { get; set; } = 1;
    private int _limit = 3;
    public int limit
    {
        get => _limit;
        set => _limit = (value > MaxPageSize) ? MaxPageSize : value;
    }
}
