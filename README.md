# **To an fro** - from one place to another

Toanfro is an application to monitor visitors of redirects. 


The application has three parts.

* Admin Panel exposed locally
  * view/create redirects.
  * view visitors.
* Admin API exposed locally
  * provides functionality for creating redirects and viewing visitors
* Public API exposed via proxy [Apache,Nginx, etc..] to the public.
  * redirect and serve js bundle
  * consume redirect results