describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Jim',
      username: 'godzilla',
      password: 'password'
    }
    cy.request('POST','http://localhost:3001/api/users/', user )
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('godzilla')
      cy.get('#password').type('password')
      cy.contains('login').click()

      cy.contains('Jim logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('godzilla')
      cy.get('#password').type('wrong password')
      cy.contains('login').click()

      cy.contains('invalid username or password')
        .should('have.css', 'color', 'rgb(255, 0, 0)')
    })

  })


  describe('when logged in', function () {
    beforeEach(function() {
      cy.login({ username: 'godzilla', password: 'password' })
    })

    it('A blog can be created', function() {
      cy.contains('create new blog').click()
      cy.get('#title').type('testing with cypress')
      cy.get('#author').type('tester')
      cy.get('#url').type('http://www.testing-with-cypress.com')
      cy.get('#btn-submit-blog').click()

      cy.contains('testing with cypress')
    })

    describe('and a blog exists', function() {
      beforeEach(function() {
        cy.createBlog({
          title:'testing with cypress',
          author: 'tester',
          url: 'http://www.testing-with-cypress.com',
          likes: 1
        })
        cy.createBlog({
          title:'need more blogs',
          author: 'tester 2',
          url: 'http://www.moreblogs.com',
          likes: 2,
        })
        cy.createBlog({
          title:'even more blogs',
          author: 'tester 3',
          url: 'http://www.evenmoreblogs.com',
          likes: 3
        })
      })

      it('a blog can be liked', function() {
        cy.contains('view').click()
        cy.get('#btn-like-blog').click()

        cy.get('#likes').contains(1)
      })

      it('a blog can be deleted by creator', function() {
        cy.contains('view').click()
        cy.get('#btn-delete-blog').click()

        cy.get('html').should('not.contain', 'testing with cypress')
      })

      it.only('a blog list is sorted according to likes', function() {
        cy.get('.likes')
          .then( likes => {
            cy.wrap(likes[0].innerHTML).should('contain', '3')
            cy.wrap(likes[1].innerHTML).should('contain', '2')
            cy.wrap(likes[2].innerHTML).should('contain', '1')
          })
      })
    })





  })

})