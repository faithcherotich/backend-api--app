document.addEventListener('DOMContentLoaded', () => {
     loadProducts();
     loadBlogs();
     renderCart();

    document.getElementById('product-form').addEventListener('submit', function(event) {
        event.preventDefault();
        addOrUpdateProduct();
    });

    document.getElementById('blog-form').addEventListener('submit', function(event) {
        event.preventDefault();
        addBlogForm();
    });

   

    document.getElementById('add-product-button').addEventListener('click', function() {
        showAddProductForm();
    });

  

   
});

function loadProducts() {
    fetch('http://localhost:3000/Products')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (Array.isArray(data)) {
                const productSection = document.getElementById('products-section');
                productSection.innerHTML = ''; 

                const productCards = data.map(product => {
                    return `
                        <div class="product-card col-md-4">
                            <img src="${product.productImage}" alt="${product.productName}" class="img-fluid">
                            <h3>${product.productName}</h3>
                            <p>${product.productPrice}</p>
                            <p>${product.productDescription}</p>
                            <button class="btn btn-primary" onclick="viewProduct('${product.productName}')">View Details</button>
                            <button class="btn btn-secondary" onclick="editProduct('${product.productName}')">Edit</button>
                             <button class="btn btn-success" onclick="buyProduct('${product.id}')">Buy Product</button>
                            <button class="btn btn-danger" onclick="deleteProduct('${product.id}')">Delete</button>
                        </div>
                    `;
                }).join('');
                productSection.innerHTML = productCards;
            }
        })
        
}

function viewProduct(productName) {
    fetch('http://localhost:3000/Products')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const product = data.find(p => p.productName === productName);
            if (product) {
                const productDetailsContainer = document.getElementById('product-details-section');
                productDetailsContainer.innerHTML = `
                    <div class="col-md-6">
                        <img src="${product.productImage}" alt="${product.productName}" class="img-fluid">
                    </div>
                    <div class="col-md-6">
                        <h2>${product.productName}</h2>
                        <p>${product.productPrice}</p>
                        <p>${product.productDescription}</p>
                        <button class="btn btn-secondary" onclick="showSection('products-section')">Back to Products</button>
                        <button class="btn btn-success" onclick="buyProduct('${product.id}')">Buy Product</button>
                    </div>
                `;
                showSection('product-details-section');
            }
        })
    }

function editProduct(productName) {
    fetch('http://localhost:3000/Products')
        .then(response => response.json())
        .then(data => {
            const product = data.find(p => p.productName === productName);
            if (product) {
                document.getElementById('productImage').value = product.productImage;
                document.getElementById('productName').value = product.productName;
                document.getElementById('productPrice').value = product.productPrice;
                document.getElementById('productDescription').value = product.productDescription;

                document.getElementById('product-form').setAttribute('data-edit-id', product.id);
                showSection('product-form-section');
            }
        })
       
}

function deleteProduct(productId) {
    fetch(`http://localhost:3000/Products/${productId}`, 
        { method: 'DELETE' })
        .then(response => {
            loadProducts();
        })
          
      
}

function buyProduct(productId) {
    alert(`Product with ID ${productId} has been bought!`);
}

function showSection(sectionId) {
    const sections = ['products-section', 'product-details-section', 'product-form-section', 'blog-section', 'blog-details-section'];
    sections.forEach(id => {
        document.getElementById(id).style.display = (id === sectionId) ? 'block' : 'none';
    });
}


function addOrUpdateProduct() {
    const productImage = document.getElementById("productImage").value;
    const productName = document.getElementById("productName").value;
    const productPrice = document.getElementById("productPrice").value;
    const productDescription = document.getElementById("productDescription").value;

    const productInfo = {
        productImage,
        productName,
        productPrice,
        productDescription
    };

    
        fetch("http://localhost:3000/Products", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(productInfo),
        })
        .then(response => response.json())
       
        .then(data => {
             loadProducts();
             showSection('products-section');
        })
        document.getElementById('add-product-button').addEventListener('click', function() {
            showAddProductForm();
        });
    }


   
function showAddProductForm() {
    document.getElementById('product-form').reset();
    document.getElementById('product-form').removeAttribute('data-edit-id');
    showSection('product-form-section');
}

function loadBlogs() {
    fetch('http://localhost:3000/blog')
        .then(response => response.ok ? response.json() : Promise.reject('Network response was not ok'))
        .then(data => {
            if (Array.isArray(data)) {
                const blogSection = document.getElementById('blog-section');
                blogSection.innerHTML = data.map(blog => `
                    <div class="blog-card col-md-4">
                        <h3>${blog.title}</h3>
                        <p>${blog.content}</p>
                        <p>${blog.use}</p>
                        <button class="btn btn-primary" onclick="viewBlog('${blog.title}')">View Details</button>
                        <button class="btn btn-secondary" onclick="editBlog('${blog.title}')">Edit</button>
                        <button class="btn btn-danger" onclick="deleteBlog('${blog.id}')">Delete</button>
                    </div>
                `).join('');
            }
        })
    }

function viewBlog(title) {
    fetch('http://localhost:3000/blog')
        .then(response => response.ok ? response.json() : Promise.reject('Network response was not ok'))
        .then(data => {
            const blog = data.find(b => b.title === title);
            if (blog) {
                const blogDetailsContainer = document.getElementById('blog-details-section');
                blogDetailsContainer.innerHTML = `
                    <div class="col-md-12">
                        <h2>${blog.title}</h2>
                        <p>${blog.content}</p>
                        <p>${blog.use}</p>
                        <button class="btn btn-secondary" onclick="showSection('blog-section')">Back to Blog</button>
                    </div>
                `;
                document.getElementById('blog-form').setAttribute('data-edit-id', product.id);
                showSection('blog-form-section');
            }
           
        })
        .catch(error => console.error('Error fetching blog:', error));
}


function editBlog(title) {
    fetch('http://localhost:3000/blog')
        .then(response => response.json())
        .then(data => {
            const blog = data.find(b => b.title === title);
            if (blog) {
                document.getElementById('title').value = blog.title;
                document.getElementById('content').value = blog.content;
                document.getElementById('use').value = blog.use;
                document.getElementById('blog-form').setAttribute('data-edit-id', blog.id);
                showSection('blog-form-section');
            }
        })
        .catch(error => console.error('Error fetching blog:', error));
}


function deleteBlog(blogId) {
    fetch(`http://localhost:3000/blog/${blogId}`, 
        { method: 'DELETE',
            headers:{"Content-Type":"application/json"},
         });
        
}
 function addBlogForm(event){
    
            const title= document.getElementById('title').value;
            const content= document.getElementById('content').value;
            const use= document.getElementById('use').value;
            
            const blogInfo = {
                title,
                content,
                use
            }
            fetch('http://localhost:3000/blog',{
                method: "POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(blogInfo),
        })
        .then(response=>response.json())
        .then((data) => {
            loadBlogs();
            showSection('blog-section');
       })
        }


    // Initialize the cart
    let cart = [];

    // Cart display function
    function renderCart() {
        const cartContainer = document.getElementById('cart-section');
        cartContainer.innerHTML = cart.map(item => `
            <div>${item.productName} - ${item.productPrice}</div>
        `).join('');
    }

    // Modify buyProduct to add to cart
    window.buyProduct = function(productId) {
        fetch(`http://localhost:3000/Products/${productId}`)
            .then(response => response.json())
            .then(product => {
                cart.push(product);
                alert(`${product.productName} has been added to your cart!`);
                renderCart();  // Refresh cart display
            });
    }; 


