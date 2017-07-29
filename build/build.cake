#addin "Cake.Yarn"

///////////////////////////////////////////////////////////////////////////////
// ARGUMENTS
///////////////////////////////////////////////////////////////////////////////

var target = Argument<string>("target", "Default");
var configuration = Argument<string>("configuration", "Release");

///////////////////////////////////////////////////////////////////////////////
// GLOBAL VARIABLES
///////////////////////////////////////////////////////////////////////////////

var solutions = GetFiles("./**/*.sln");
var solutionPaths = solutions.Select(solution => solution.GetDirectory());
var sourceDir = "..\\";
var outputDir = "..\\bin";

///////////////////////////////////////////////////////////////////////////////
// SETUP / TEARDOWN
///////////////////////////////////////////////////////////////////////////////

Setup(() =>
{
    // Executed BEFORE the first task.
    Information("Running tasks...");
});

Teardown(() =>
{
    // Executed AFTER the last task.
    Information("Finished running tasks.");
});

///////////////////////////////////////////////////////////////////////////////
// TASK DEFINITIONS
///////////////////////////////////////////////////////////////////////////////

Task("Clean")
    .Description("Cleans Output folder")
    .Does(() =>
{
    CleanDirectories(outputDir);
});

Task("BuildBackend")
    .Description("Builds backend soloutution")
    .IsDependentOn("Clean")
    .Does(()=>
{
    var solution = sourceDir + "\\ANW.ComposerApp.sln";

    NuGetRestore(solution);

    MSBuild(solution, settings => 
        settings.SetConfiguration("Release"));
});

Task("Run")
    .Description("Deploy to/from folders")
    .Does(() =>
    {
        var iisDir =  EnvironmentVariable("programfiles").ToString() + "\\IIS Express";
        var iisStartPath = MakeAbsolute(new DirectoryPath("../ANW.ComposerApp")).FullPath.Replace('/','\\');

		StartProcess("cmd", new ProcessSettings {
			Arguments = "/C \"start iisexpress.exe /path:" + iisStartPath + " /port:55488\"" ,
			WorkingDirectory = iisDir
		});
			
		StartProcess("cmd", new ProcessSettings {
			Arguments = "/C \"start chrome \"http://localhost:55488\"\"" 
		});
	});

Task("Yarn-Install")
    .Description("Builds Frontend package")
    .Does(()=>
{
   Yarn.FromPath(sourceDir + "\\ANW.ComposerApp").Install();
});

Task("Yarn-Run Build")
	.Does(() =>
	{
		Yarn.FromPath(sourceDir + "\\ANW.ComposerApp").RunScript("build");
	});

///////////////////////////////////////////////////////////////////////////////
// TARGETS
///////////////////////////////////////////////////////////////////////////////

Task("Default")
    .Description("This is the default task which will be ran if no specific target is passed in.")
    .IsDependentOn("Clean")
    .IsDependentOn("BuildBackend")
    .IsDependentOn("Yarn-Install")
    .IsDependentOn("Yarn-Run Build")
	.IsDependentOn("Run");
    
///////////////////////////////////////////////////////////////////////////////
// EXECUTION
///////////////////////////////////////////////////////////////////////////////

RunTarget(target);