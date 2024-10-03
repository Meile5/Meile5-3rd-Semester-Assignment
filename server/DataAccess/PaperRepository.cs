using DataAccess.Interfaces;
using DataAccess.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace DataAccess;
public class PaperRepository : IPaperRepository
{
    private readonly PaperContext _context;

    public PaperRepository(PaperContext context)
    {
        _context = context;
    }

    public List<Paper> GetAllPapers()
    {
        //  load related Properties for each Paper
        var papers = _context.Papers
            .Include(p => p.Properties) 
            .ToList();
    
        return papers;
    }
    
    public int GetTotalPapersCount()
    {
        return _context.Papers.Count(); // Get total count of papers
    }

    public List<Order> GetCustomerOrders(int customerId)
    {
        // load order history of the customer by id, including order entries and products (papers)
        var orders = _context.Orders
            .Where(o => o.CustomerId == customerId)
            .Include(order => order.OrderEntries)
            .ThenInclude(orderEntry => orderEntry.Product) 
            .ToList();

        return orders;
    }
    
    public async Task<Order> InsertOrderAsync(Order order)
    {
        _context.Orders.Add(order);
        await _context.SaveChangesAsync();  
        return order;  
    }

   

   /* public async Task DeductProductQuantityAsync(int productId, int quantity)
    {
        var product = await _context.Papers.FindAsync(productId);
        if (product != null && product.Stock >= quantity)
        {
            product.Stock -= quantity;
            await _context.SaveChangesAsync(); 
        }
        else
        {
            throw new Exception("Insufficient stock for product ID: " + productId);
        }
    }*/
}
